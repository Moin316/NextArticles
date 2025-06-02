"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
// import Skeleton from "@/components/ui/skeleton"; // Use your preferred loading component

const TopArticles = dynamic(() => import("./TopArticles"), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      {/* <Skeleton className="h-[300px] w-full" />
      <Skeleton className="h-[100px] w-full" />
      <Skeleton className="h-[100px] w-full" /> */}
      Loading...
    </div>
  ),
});

export default function TopArticlesWrapper() {
  return (
    <Suspense
      fallback={
        <div className="space-y-4">
          {/* <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[100px] w-full" />
          <Skeleton className="h-[100px] w-full" /> */}
          Loading...
        </div>
      }
    >
      <TopArticles />
    </Suspense>
  );
}
