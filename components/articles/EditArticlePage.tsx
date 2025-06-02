"use client";

import { Articles } from "@prisma/client";
import EditArticlePage from "./EditArticlePage";

interface EditArticleContainerProps {
  article: Articles;
}

export default function EditArticleContainer({
  article,
}: EditArticleContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <EditArticlePage article={article} />
      </main>
    </div>
  );
}
