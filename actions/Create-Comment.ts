"use server"

import { prisma } from "@/app/lib/prisma"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const createCommentSchema = z.object({
    body:z.string().min(1, {message:"Comment is required"}),
})
type CreateCommentFormState={
    errors?:{
        body?:string[]
        formErrors?:string[]
    }      
}
export const createComment = async (articleId:string,prevState:CreateCommentFormState,formData:FormData) => {
    const result = createCommentSchema.safeParse({
        body:formData.get("body"),
    })
    if(!result.success) {
        return {errors:{body:result.error.flatten().fieldErrors.body}}
    }
    const {userId} = await auth()
    if(!userId) return {errors:{formErrors:["Unauthorized"]}}
    const existingUser = await prisma.user.findUnique({
        where:{
            clerkUserId:userId
        }
    })
    if(!existingUser) return {errors:{formErrors:["User not found"]}}
    try{
        const comment = await prisma.comment.create({
            data:{
                content:result.data.body,
                articleId,
                userId:existingUser.id
            }
        })
    }
    catch(error){
        return {errors:{formErrors:["Failed to create comment"]}}
    }
    revalidatePath(`/articles/${articleId}`)
    return {success:"Comment created successfully"}
}