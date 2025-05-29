"use client"
import React, { useActionState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { createComment } from "@/actions/Create-Comment";

const CommentInput:React.FC<{articleId:string}> = ({articleId}) => {
    const [formState,action,isPending] = useActionState(createComment.bind(null,articleId),{
        errors:{
            body:[]
        }
    })
  return (
    <form action={action} className="mb-8">
      <div className="flex gap-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input type="text" placeholder="Add a comment" name="body" />
          {
            formState.errors?.body && formState.errors.body.map((error:string)=>(
                <p key={error} className="text-red-500 text-sm">{error}</p>
            ))
          }
          <div className="mt-4 flex items-center justify-end">
            <Button type="submit" disabled={isPending}>{isPending ? "Posting..." : "Post Comment"}</Button>
          </div>
          {
            formState.errors?.formErrors &&(
                <div className="mt-2 p-2 bg-red-500 text-white rounded-md">
                    {formState.errors.formErrors.map((error:string)=>(
                        <p key={error} className="text-red-500 text-sm">{error}</p>
                    ))}
                </div>
            )
          }
        </div>
      </div>
    </form>
  );
};

export default CommentInput;
