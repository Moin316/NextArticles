import { Prisma } from '@prisma/client'
import Image from 'next/image'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { CalendarIcon, ClockIcon } from 'lucide-react'
import LikeButton from './LikeButton'
import CommentsSection from '../comments/CommentsSection'
import CommentInput from '../comments/CommentInput'
import { prisma } from '@/app/lib/prisma'
import { auth } from '@clerk/nextjs/server'

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true
          email: true
          imageUrl: true
        }
      }
      likes: true
    }
  }>
}

const ArticleDetailPage: React.FC<ArticleDetailPageProps> = async ({ article }) => {
  const { userId } = await auth()

  // Get internal user by Clerk userId
  const currentUser = userId
    ? await prisma.user.findUnique({
        where: { clerkUserId: userId }
      })
    : null

  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          imageUrl: true
        }
      }
    }
  })

  const isLiked = currentUser
    ? article.likes?.some(like => like.userId === currentUser.id)
    : false

  return (
    <div className='min-h-screen bg-background'>
      <main className='container mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <article className='mx-auto max-w-3xl'>
          <header className='mb-8'>
            <div className='flex flex-wrap gap-2 mb-4'>
              <span className='rounded-full text-white px-3 py-1 text-sm font-medium'>
                {article.category}
              </span>
            </div>
            <h1 className='text-4xl font-bold text-center mb-2'>{article.title}</h1>
            <div className='flex items-center justify-center gap-2'>
              <Avatar>
                <AvatarImage src={article.author.imageUrl!} />
                <AvatarFallback>
                  {article.author.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <p className='text-gray-600 text-sm'>By {article.author.name}</p>
              <p className='text-gray-600 text-sm flex items-center gap-1'>
                <CalendarIcon className='w-4 h-4 inline-block mr-1' />
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
              <p className='text-gray-600 text-sm flex items-center gap-1'>
                <ClockIcon className='w-4 h-4 inline-block mr-1' />
                {Math.ceil(Math.random() * 10)} min read
              </p>
            </div>
          </header>

          <section className='relative w-full h-96'>
            <Image
              src={article.featuredImage!}
              alt={article.title}
              fill
              className='object-cover rounded-lg'
            />
          </section>

          <div className='prose max-w-none mt-8'>
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          </div>

          {/* Like, Save, Share */}
          {currentUser && (
            <LikeButton
              articleId={article.id}
              isLiked={isLiked}
              likes={article.likes}
            />
          )}

          {/* Comment input */}
          <CommentInput articleId={article.id} />

          {/* Comments */}
          <CommentsSection comments={comments} />
        </article>
      </main>
    </div>
  )
}

export default ArticleDetailPage
