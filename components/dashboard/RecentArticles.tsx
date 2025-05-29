"use client"
import React, { useTransition } from "react";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Trash } from "lucide-react";
import { Prisma } from "@/app/generated/prisma";
import { deleteArticle } from "@/actions/delete-article";

type ArticleType = Prisma.ArticlesGetPayload<{
  include: {
    author: {
      select: {
        name: true;
        email: true;
        imageUrl: true;
        
      };
    };
    comments: true;
  };
}>;

type RecentArticleProps = {
  articles: ArticleType[];
};
const RecentArticles:React.FC<RecentArticleProps> = ({ articles }) => {
  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Articles</CardTitle>
          <Button
            variant={"ghost"}
            className="text-foreground-muted hover:text-foreground"
          >
            View All
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
        </div>
      </CardHeader>
      {articles.length === 0 ? (
        <CardContent>
          <p className="text-center text-muted-foreground">No articles found</p>
        </CardContent>
      ) : (
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comments</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                articles.map((article)=>(
                <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>
                  <Badge
                    variant={"secondary"}
                    className="rounded-full bg-green-100 text-green-800"
                  >
                    Published
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={"secondary"}
                    className="rounded-full bg-blue-100 text-blue-800"
                  >
                    {article.comments.length}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={"secondary"}
                    className="rounded-full bg-blue-100 text-blue-800"
                  >
                    {new Intl.DateTimeFormat("en-US").format(new Date(article.createdAt))}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2 ml-[-20px]">
                    <Link href={`/dashboard/articles/${article.id}/edit`}>
                      <Button
                        variant={"ghost"}
                        className="text-foreground-muted hover:text-foreground"
                      >
                        Edit
                      </Button>
                    </Link>
                    <DeleteButton articleId={article.id} />
                  </div>
                </TableCell>
              </TableRow>
                ))
              }
              
            </TableBody>
          </Table>
        </CardContent>
      )}
    </Card>
  );
};

export default RecentArticles;
type DeleteButtonProps = {
  articleId: string;
} 
const DeleteButton:React.FC<DeleteButtonProps> = ({articleId}) => {
  const [isPending, startTransition] = useTransition();
  return (
    <form action={()=>{
      startTransition(()=>{
        deleteArticle(articleId);
      })
    }}>
    <Button
      variant={"ghost"}
      className="text-foreground-muted hover:text-foreground"
    >
      <Trash className="size-4" />
    </Button>
    </form>
  );
};
