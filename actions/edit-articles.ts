// actions/edit-article.ts
"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

type EditInput = {
  articleId: string;
  title: string;
  category: string;
  content: string;
  featuredImage?: string | null;
};

export const editArticle = async ({
  articleId,
  title,
  category,
  content,
  featuredImage,
}: EditInput) => {
  await prisma.articles.update({
    where: { id: articleId },
    data: { title, category, content, featuredImage },
  });

  revalidatePath("/articles");
  revalidatePath(`/articles/${articleId}`);
};
