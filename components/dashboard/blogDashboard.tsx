import React from "react";
import { Button } from "../ui/button";
import { FileText, MessageCircle, Plus, Star } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import RecentArticles from "./RecentArticles";
import { prisma } from "@/app/lib/prisma";

const BlogDashboard =async () => {
    const [articles,totalComments]=await Promise.all([
        prisma.articles.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                comments:true,
                author:{
                    select:{
                        name:true,
                        email:true,
                        imageUrl:true,
                    }
                }
            }
        }),
        prisma.comment.count(), 
    ])
  return (
    <main className="flex-1 p-4 md:p-8 w-full">
      <div className="flex justify-between items-center mb-8" >
        <div>
          <h1 className="text-2xl font-bold">Blog Dashboard</h1>
          <p className="text-sm text-gray-500">
            Manage your blog posts and analytics here
          </p>
        </div>
        <Link href="/dashboard/articles/create">
            <Button className="cursor-pointer">
                <Plus className="w-5 h-5 mr-2" />
                New Article
            </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">
                    All Articles
                </CardTitle>
                <FileText className="w-4 h-4 ml-2" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {articles.length}
                </div>
                <p className="text-sm text-muted-foreground mt-1">+5 from last month</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">
                    All Comments
                </CardTitle>
                <MessageCircle className="w-4 h-4 ml-2" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {totalComments}
                </div>
                <p  className="text-sm text-muted-foreground mt-1">12 awaiting moderation</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold">
                    Average Rating
                </CardTitle>
                <Star className="w-4 h-4 ml-2" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    4.2
                </div>
                <p  className="text-sm text-muted-foreground mt-1">4.5 Average rating</p>
            </CardContent>
        </Card>
      </div>
        <RecentArticles articles={articles} />
    </main>
  );
};

export default BlogDashboard;
