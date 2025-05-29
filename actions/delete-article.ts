"use server"

import { prisma } from "@/app/lib/prisma"
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
    await prisma.articles.delete({
        where: {
            id: articleId,
        }
    });
    revalidatePath("/dashboard");
}
