import AllArticlesPage from "@/components/articles/AllArticlesPage";
import ArticleSearchInput from "@/components/articles/ArticleSarchInput";
import ArticlesLoading from "@/components/articles/ArticlesLoading";

import { Suspense } from "react";
export default function Page({
  searchParams = {},
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const flatParams = new URLSearchParams();

  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        flatParams.append(key, v);
      }
    } else {
      flatParams.append(key, value);
    }
  }

  const queryString = flatParams.toString();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl">
            All Articles
          </h1>
          <ArticleSearchInput />
        </div>
        <Suspense fallback={<ArticlesLoading />}>
          <AllArticlesPage searchParams={queryString} />
        </Suspense>
      </main>
    </div>
  );
}

