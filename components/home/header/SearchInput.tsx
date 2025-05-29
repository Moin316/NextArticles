"use client";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";
import { useSearchParams } from "next/navigation";
import { searchAction } from "@/actions/search";

const SearchInput = () => {
  const searchParams = useSearchParams();

  return (
    <form action={searchAction}>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          name="search"
          type="text"
          placeholder="Search..."
          defaultValue={searchParams.get("search") || ""}
          className="pl-10 w-48 focus-visible:ring h-8 text-sm"
        />
      </div>
    </form>
  );
};

export default SearchInput;
