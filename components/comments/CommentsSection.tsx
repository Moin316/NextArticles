import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CalendarIcon, UserIcon } from 'lucide-react'
import { Prisma } from '@prisma/client'

type CommentListProps={
    comments:Prisma.CommentGetPayload<{
        include:{
            user:{
                select:{
                    name:true,
                    email:true,
                    imageUrl:true
                }
            }
        }
    }>[]
}
const CommentsSection:React.FC<CommentListProps> = ({comments}) => {
  return (
    <div className='space-y-8 mt-5 border-t pt-5'>
        {
            comments.map((comment)=>(
                <div key={comment.id} className='flex gap-4'>
                    <Avatar className='w-10 h-10'>
                <AvatarImage src='https://github.com/shadcn.png' className='cursor-pointer' />
                <AvatarFallback>
                    <UserIcon className='w-4 h-4' />
                </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium capitalize hover:underline'>{comment.user.name}</span>
                    <span className='text-sm text-gray-500 flex items-center gap-1'>
                        <CalendarIcon className='w-4 h-4 inline-block mr-1' />
                        {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </span>
                </div>
                <p className='text-sm text-gray-700'>{comment.content}</p>
            </div>
        </div>
            ))
        }
    </div>
  )
}

export default CommentsSection
