import { prisma } from '@/app/lib/prisma';
import EditArticlePage from '@/components/articles/EditArticlePage'
import React from 'react'
type EditArticlePageProps = {
    params: {
        id: string;
    }
}
const page:React.FC<EditArticlePageProps> = async ({params}) => {
    const id=(await params).id;
    const article=await prisma.articles.findUnique({
        where: {
            id: id,
        }
    })
    if(!article){
        return <div>Article not found</div>
    }
  return (
    <div>
      <EditArticlePage article={article} />
    </div>
  )
}

export default page
