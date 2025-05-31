import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ArticlesLoading = () => {
  const skeletons = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skeletons.map((index) => (
        <Card
          key={index}
          className="group relative overflow-hidden rounded-lg shadow-md"
        >
          <div className="p-6">
            <div className="relative mb-4 w-full h-48 overflow-hidden rounded-xl">
              <Skeleton className="h-full w-full" />
            </div>
            <Skeleton className="h-6 w-3/4 mb-2" />
            <div className="space-y-2 mb-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
            </div>
            <div className="mt-6 flex items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </Card>
      ))}
      <div className="col-span-full">
        <div className="flex justify-center gap-2 mt-12">
          <Skeleton className="h-10 w-24" />
          <div className="flex gap-2">
            <Skeleton className="h-10 w-10 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
            <Skeleton className="h-10 w-10 rounded" />
          </div>
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
};

export default ArticlesLoading;
