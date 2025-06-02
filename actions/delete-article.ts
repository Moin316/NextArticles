"use server"

import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
    // Delete associated likes
    await prisma.likes.deleteMany({
      where: { articleId },
    });
  
    // Delete associated comments
    await prisma.comment.deleteMany({
      where: { articleId },
    });
  
    // Now delete the article
    await prisma.articles.delete({
      where: { id: articleId },
    });
  
    revalidatePath("/dashboard");
  };
  