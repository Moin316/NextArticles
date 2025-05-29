import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { prisma } from "@/app/lib/prisma";
import { fetchArticleByQuery } from "@/app/lib/query/fetch-article-by-query";
import { Search } from "lucide-react";
import { Button } from "../ui/button";

type AllArticlesPageProps = {
  searchParams: string
};

const AllArticlesPage:React.FC<AllArticlesPageProps> = async ({ searchParams }) => {
  // Extract page from searchParams
  const searchParamsObj = new URLSearchParams(searchParams);
  const page = parseInt(searchParamsObj.get('page') || '1');
  
  const result = await fetchArticleByQuery(searchParams, page);
  if(result.articles.length === 0){
    return <NoArticlesFound />
  }
  
  // Generate page numbers array
  const pageNumbers = Array.from({ length: result.totalPages }, (_, i) => i + 1);
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {result.articles.map((article) => (
          <Card
            key={article.id}
            className="group relative overflow-hidden rounded-lg shadow-md"
          >
            <div className="p-6">
              <div className="relative mb-4 w-full h-48 overflow-hidden rounded-xl">
                <Image
                  src={article.featuredImage || "/default.jpg"}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
              <Link href={`/articles/${article.id}`} className="hover:underline">
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
              </Link>
              <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                {article.content.replace(/<[^>]+>/g, "")}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src={article.author?.imageUrl || "/default-avatar.png"}
                  />
                  <AvatarFallback>
                    {article.author?.name?.charAt(0) || "A"}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-600">
                  {article.author?.name || "Unknown Author"}
                </span>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Pagination - only shown when there are articles */}
      <div className="flex justify-center gap-2 mt-12">
        <Link href={`/articles?search=${searchParams}&page=${Math.max(1, result.currentPage - 1)}`}>
          <Button variant="ghost" disabled={result.currentPage === 1}>
            Previous
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18"
              />
            </svg>
          </Button>
        </Link>

        {pageNumbers.map((pageNum) => (
          <Link key={pageNum} href={`/articles?search=${searchParams}&page=${pageNum}`}>
            <Button 
              variant="ghost" 
              size="sm"
              className={pageNum === result.currentPage ? "bg-primary text-primary-foreground" : ""}
            >
              {pageNum}
            </Button>
          </Link>
        ))}

        <Link href={`/articles?search=${searchParams}&page=${Math.min(result.totalPages, result.currentPage + 1)}`}>
          <Button variant="ghost" disabled={result.currentPage === result.totalPages}>
            Next
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </>
  );
};

export default AllArticlesPage;

const NoArticlesFound = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 rounded-full bg-muted p-4">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
    
          <h3 className="text-xl font-semibold text-foreground">
            No Results Found
          </h3>
    
          <p className="mt-2 text-muted-foreground">
            We could not find any articles matching your search. Try a different
            keyword or phrase.
          </p>
        </div>
      );
}