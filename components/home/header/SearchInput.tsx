"use client";

import { Suspense } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchAction } from "@/actions/search";
import { useSearchParams } from "next/navigation";

// The component that actually uses useSearchParams
function SearchInputWithParams() {
  const searchParams = useSearchParams();

  return (
    <Input
      name="search"
      type="text"
      placeholder="Search..."
      defaultValue={searchParams.get("search") || ""}
      className="pl-10 w-48 focus-visible:ring h-8 text-sm"
    />
  );
}

// The main component that wraps with Suspense
const SearchInput = () => {
  return (
    <form action={searchAction}>
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Suspense
          fallback={
            <Input
              name="search"
              type="text"
              placeholder="Search..."
              className="pl-10 w-48 focus-visible:ring h-8 text-sm"
            />
          }
        >
          <SearchInputWithParams />
        </Suspense>
      </div>
    </form>
  );
};

export default SearchInput;
