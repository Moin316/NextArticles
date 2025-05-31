// components/home/TopArticlesWrapper.tsx
"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamically load TopArticles without SSR
const TopArticles = dynamic(() => import("./TopArticles"), {
  ssr: false,
  loading: () => <h1>Loading articles...</h1>,
});

export default function TopArticlesWrapper() {
  return <TopArticles />;
}
