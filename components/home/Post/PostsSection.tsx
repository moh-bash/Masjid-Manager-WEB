import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import PostCard from "./PostCard";
import { Post } from "@/lib/features/post/types";

export default function PostsSection({
  posts,
}: { posts: Post[] }) {
  return (
    <section className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-primary">
              محتوى نافع
            </span>

            <h2 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
              زادٌ من القرآن والعلم
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-neutral-500">
              وقفات ومحتويات نافعة نشاركها معكم 
            </p>
          </div>

          <Link
            href="/posts"
            className="inline-flex items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-700"
          >
            جميع المنشورات
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
      </div>
    </section>
  );
}   