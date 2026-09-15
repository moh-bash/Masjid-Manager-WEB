import PostCardSkeleton from "./PostCardSkeleton";

export default function PostsSectionSkeleton() {
  return (
    <section className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header skeleton */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <div className="h-4 w-28 animate-pulse rounded bg-neutral-200" />
            <div className="h-8 w-64 animate-pulse rounded bg-neutral-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-neutral-200" />
          </div>
          <div className="h-4 w-28 animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Cards skeleton */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </div>
      </div>
    </section>
  );
}