"use server";

import { prisma } from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";
import { ensureUserExists } from "@/app/lib/ensureUserExists"; // ✅ Import helper

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createArticleSchema = z.object({
  title: z.string().min(3).max(100),
  category: z.string().min(3).max(50),
  content: z.string().min(10),
});

type CreateArticleFormState = {
  errors: {
    title?: string[];
    category?: string[];
    featuredImage?: string[];
    content?: string[];
    formErrors?: string[];
  };
};

export const createArticles = async (
  prevState: CreateArticleFormState,
  formData: FormData
): Promise<CreateArticleFormState> => {
  // Validate form inputs
  const result = createArticleSchema.safeParse({
    title: formData.get("title"),
    category: formData.get("category"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // ✅ Ensure the current user exists in DB
  const dbUser = await ensureUserExists();

  if (!dbUser) {
    return {
      errors: {
        formErrors: ["You must be logged in to create an article."],
      },
    };
  }

  // ✅ Validate and upload the image
  const imageFile = formData.get("featuredImage") as File | null;

  if (!imageFile || imageFile.name === "undefined") {
    return {
      errors: {
        featuredImage: ["Image file is required."],
      },
    };
  }

  const arrayBuffer = await imageFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  let uploadResult: UploadApiResponse | undefined;

  try {
    uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { resource_type: "auto" },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      uploadStream.end(buffer);
    });
  } catch (err) {
    return {
      errors: {
        featuredImage: ["Image upload failed. Please try again."],
      },
    };
  }

  const imageUrl = uploadResult?.secure_url;

  if (!imageUrl) {
    return {
      errors: {
        featuredImage: ["Image upload failed."],
      },
    };
  }

  // ✅ Create the article
  try {
    await prisma.articles.create({
      data: {
        title: result.data.title,
        category: result.data.category,
        content: result.data.content,
        featuredImage: imageUrl,
        authorId: dbUser.id,
      },
    });
  } catch (error: unknown) {
    return {
      errors: {
        formErrors: [
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        ],
      },
    };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
