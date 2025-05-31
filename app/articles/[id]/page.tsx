// app/articles/[id]/page.tsx
import { prisma } from "@/app/lib/prisma";
import ArticleDetailPage from "@/components/articles/ArticleDetailPage";
import { notFound } from "next/navigation";
import React from "react";

type ArticlePageProps = {
  params: { id: string };
};

const Page = async ({ params }: ArticlePageProps) => {
  const { id } = params;

  const article = await prisma.articles.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
      likes: true,
    },
  });

  if (!article) {
    notFound(); // ✅ triggers your custom 404 page
  }

  return (
    <div>
      <ArticleDetailPage article={article} />
    </div>
  );
};

export default Page;
