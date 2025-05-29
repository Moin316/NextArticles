"use client";
import React from "react";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { searchAction } from "@/actions/search";
import { useSearchParams } from "next/navigation";

const ArticleSarchInput = () => {
  const searchParams = useSearchParams();
  return (
    <form action={searchAction} className="mx-auto max-w-2xl">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          name="search"
          defaultValue={searchParams.get("search") || ""}
          placeholder="Search"
          className="pl-10 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
    </form>
  )
}

export default ArticleSarchInput
