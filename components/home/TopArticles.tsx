
import { Card } from '../ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { prisma } from '@/app/lib/prisma'

const TopArticles =async () => {
  const articles=await prisma.articles.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
        comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
    take: 3,
  })
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
        {
            articles.map((article)=>(
        <Card key={article.id} className={cn("group relative overflow-hidden transition-all hover:scale-[1.02]","border border-gray-200/50 dark:border-white/10","bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg")} >
            <div className="p-6">
                <Link href={`/articles/${article.id}`}>
                    <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                        <Image src={`${article.featuredImage}`}                     alt="Article Image"
                        fill
                        className="object-cover"/>
                    </div>
                    <div className='flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400'>
                        <Avatar>
                            <AvatarImage src={`${article.author.imageUrl}`} alt="Author Image" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <span>{article.author.name}</span>
                    </div>
                    <h3 className='mt-4 text-xl font-semibold text-gray-900 dark:text-white'>{article.title}</h3>
                    <p className='mt-2 text-gray-600 dark:text-gray-300'>A comprehensive guide to improving your coding skills and productivity.</p>
                    <p className='mt-2 text-gray-600 dark:text-gray-300'>{article.content.slice(3,-4)}</p>
                    <div className='mt-4 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400'>
                        <span>{new Intl.DateTimeFormat("en-US").format(new Date(article.createdAt))}</span>
                        <span>5 min read</span>
                    </div>
                </Link>
            </div>
        </Card>
            ))
        }
    </div>
)
}

export default TopArticles
