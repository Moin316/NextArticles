"use server"

import { prisma } from "@/app/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const toggleLike = async (articleId: string) => {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await prisma.user.findUnique({
        where: { clerkUserId: userId }
    });
    if (!user) throw new Error("User not found");

    const existingLike = await prisma.likes.findFirst({
        where: {
            articleId,
            userId: user.id
        }
    });

    if (existingLike) {
        // Unlike - delete the existing like
        await prisma.likes.delete({
            where: {
                id: existingLike.id
            }
        });
    } else {
        // Like - create a new like
        await prisma.likes.create({
            data: {
                articleId,
                userId: user.id
            }
        });
    }

    revalidatePath(`/articles/${articleId}`);
    return { success: true };
};
  