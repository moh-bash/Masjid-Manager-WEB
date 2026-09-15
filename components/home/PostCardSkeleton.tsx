export default function PostCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-3xl border border-neutral-200 bg-white">
      {/* Image skeleton */}
      <div className="h-60 animate-pulse bg-neutral-200" />

      {/* Content skeleton */}
      <div className="space-y-3 p-6">
        {/* Date */}
        <div className="h-3 w-20 animate-pulse rounded bg-neutral-200" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2 pt-1">
          <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-3 w-full animate-pulse rounded bg-neutral-200" />
          <div className="h-3 w-2/3 animate-pulse rounded bg-neutral-200" />
        </div>

        {/* Link */}
        <div className="pt-2">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-200" />
        </div>
      </div>
    </article>
  );
}