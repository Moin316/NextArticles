import { prisma } from "@/app/lib/prisma";
import { Prisma } from "@prisma/client";

type ArticleWithAuthor = {
  id: string;
  title: string;
  content: string;
  category: string;
  featuredImage: string | null;
  authorId: string;
  createdAt: Date;
  author: {
    name: string;
    imageUrl: string | null;
    email: string;
  } | null;
};

export type PaginatedArticles = {
  articles: ArticleWithAuthor[];
  totalPages: number;
  currentPage: number;
  totalArticles: number;
};

export const ITEMS_PER_PAGE = 6;

export const fetchArticleByQuery = async (
  queryString: string,
  page: number = 1
): Promise<PaginatedArticles> => {
  const params = new URLSearchParams(queryString);
  const search = params.get("search")?.trim() || "";
  const skip = (page - 1) * ITEMS_PER_PAGE;

  const where: Prisma.ArticlesWhereInput | undefined = search
    ? {
        OR: [
          {
            title: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            category: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
          {
            content: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      }
    : undefined;

  try {
    const totalArticles = await prisma.articles.count({ where });

    const articles = await prisma.articles.findMany({
      where,
      include: {
        author: {
          select: {
            name: true,
            imageUrl: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take: ITEMS_PER_PAGE,
    });

    const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);

    return {
      articles,
      totalPages,
      currentPage: page,
      totalArticles,
    };
  } catch (error) {
    console.error("Error fetching articles:", error);
    return {
      articles: [],
      totalPages: 0,
      currentPage: page,
      totalArticles: 0,
    };
  }
};
