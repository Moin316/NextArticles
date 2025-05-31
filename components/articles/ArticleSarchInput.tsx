"use client";

import React, { Suspense } from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { searchAction } from "@/actions/search";
import { useSearchParams } from "next/navigation";

function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <Input
      type="text"
      name="search"
      defaultValue={searchParams.get("search") || ""}
      placeholder="Search"
      className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
    />
  );
}

const ArticleSearchInput = () => {
  return (
    <form action={searchAction} className="mx-auto max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Suspense
          fallback={
            <Input
              type="text"
              name="search"
              placeholder="Search"
              className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          }
        >
          <SearchInput />
        </Suspense>
      </div>
    </form>
  );
};

export default ArticleSearchInput;
