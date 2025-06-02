"use server";

import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
  await prisma.likes.deleteMany({
    where: { articleId },
  });

  await prisma.comment.deleteMany({
    where: { articleId },
  });

  await prisma.articles.delete({
    where: { id: articleId },
  });

  // Refresh both dashboard and articles list
  revalidatePath("/dashboard");
  revalidatePath("/articles");
};
