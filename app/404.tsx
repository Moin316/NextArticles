// app/404.tsx
"use client";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation"; // ✅ this is safe ONLY with "use client"

export default function NotFound() {
  const router = useRouter();
  const searchParams = useSearchParams(); // ✅ safe now

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-8">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-muted-foreground mb-6">
        Could not find what you were looking for.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Go Home
      </button>
    </div>
  );
}
