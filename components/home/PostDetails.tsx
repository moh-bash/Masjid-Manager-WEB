import Link from "next/link";
import {
  ArrowRight,
} from "lucide-react";
import { Post } from "@/lib/features/post/types";
import { formatDate } from "@/lib/utils/format-date";
import MarkdownViewer from "../UI/MarkdownViewer";

interface PostDetailsProps {
  post: Post
}

export default function PostDetails({
  post,
}: PostDetailsProps) {
  return (
    <>
      {/* Article Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-8 lg:py-14">

          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
            جميع المنشورات
          </Link>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-neutral-900">
            <div className="relative h-[360px] sm:h-[480px]">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent" />

              <div className="absolute right-6 bottom-7 left-6 sm:right-10 sm:bottom-10 sm:left-10">
                <div className="flex flex-wrap items-center gap-3 text-sm text-primary-100">
                  <span>{post.author.name}</span>

                  {post.createdAt && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-primary-200" />
                      <span>{formatDate(post.createdAt)}</span>
                    </>
                  )}
                </div>

                <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-[1.4] text-white sm:text-5xl">
                  {post.title}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-neutral-50 px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl">

          <article className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm sm:p-10 lg:p-12">

            {/* Intro */}
            <p className="text-lg font-medium leading-9 text-neutral-700">
              {post.excerpt}
            </p>

            <div className="my-8 h-px bg-neutral-100" />

            {/* Content */}
            <div className="space-y-6">
              <MarkdownViewer content={post.content} />
            </div>

            {/* Verse */}


            {/* Hadith */}


            {/* Source */}

          </article>

          {/* Back */}
          <div className="mt-8 text-center">
            <Link
              href="/posts"
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-5 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:border-primary-200 hover:bg-primary-50 hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
              العودة إلى المنشورات
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}