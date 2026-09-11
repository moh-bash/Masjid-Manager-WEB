import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
} from "lucide-react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    source: string;
    sourceUrl: string;
    date?: string;
  };
}

export default function PostCard({
  post,
}: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-xl hover:shadow-neutral-900/5">
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />

        <div className="absolute bottom-4 right-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-neutral-600 backdrop-blur">
          {post.source}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <p className="text-xs text-neutral-400">
          {post.date}
        </p>

        <h2 className="mt-2 text-xl font-bold leading-8 text-neutral-900">
          {post.title}
        </h2>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-neutral-500">
          {post.excerpt}
        </p>

        <Link
          href={`/posts/${post.id}`}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-700"
        >
          قراءة المقال
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}