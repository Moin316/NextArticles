import { prisma } from '@/app/lib/prisma';
import ArticleDetailPage from '@/components/articles/ArticleDetailPage';
import React from 'react';

type ArticlePageProps = {
  params: Promise<{ id: string }>;
};

const page: React.FC<ArticlePageProps> = async ({ params }) => {
  const { id } = await params;
  
  const article = await prisma.articles.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true
        }
      },
      likes: true,  // Include likes relation here
    },
  });

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <ArticleDetailPage article={article} />
    </div>
  );
};

export default page;
