import { prisma } from "@/app/lib/prisma";

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
}

export const ITEMS_PER_PAGE = 6;

export const fetchArticleByQuery = async (query: string, page: number = 1): Promise<PaginatedArticles> => {
    const skip = (page - 1) * ITEMS_PER_PAGE;

    try {
        // Get total count for pagination
        const totalArticles = await prisma.articles.count({
            where: query && query.trim() !== '' ? {
                OR: [
                    { title: { contains: query, mode: 'insensitive' as const } },
                    { category: { contains: query, mode: 'insensitive' as const } },
                    { content: { contains: query, mode: 'insensitive' as const } },
                ],
            } : undefined
        });

        // Get paginated articles
        const articles = await prisma.articles.findMany({
            where: query && query.trim() !== '' ? {
                OR: [
                    { title: { contains: query, mode: 'insensitive' as const } },
                    { category: { contains: query, mode: 'insensitive' as const } },
                    { content: { contains: query, mode: 'insensitive' as const } },
                ],
            } : undefined,
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
                createdAt: 'desc'
            },
            skip,
            take: ITEMS_PER_PAGE,
        });

        const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);

        return {
            articles: articles as ArticleWithAuthor[],
            totalPages,
            currentPage: page,
            totalArticles
        };
    } catch (error) {
        console.error('Error fetching articles:', error);
        return {
            articles: [],
            totalPages: 0,
            currentPage: page,
            totalArticles: 0
        };
    }
} 