import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ExternalLink,
} from "lucide-react";

interface PostDetailsProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    source: string;
    sourceUrl: string;
    date?: string;
    content: string[];
    verse?: {
      text: string;
      reference: string;
    };
    hadith?: {
      text: string;
      reference: string;
      sourceUrl: string;
    };
  };
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
                  <span>{post.source}</span>

                  {post.date && (
                    <>
                      <span className="h-1 w-1 rounded-full bg-primary-200" />
                      <span>{post.date}</span>
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
              {post.content.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-9 text-neutral-600"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Verse */}
            {post.verse && (
              <div className="my-10 rounded-3xl border border-primary-100 bg-primary-50 p-7">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                    <BookOpen className="h-5 w-5" />
                  </div>

                  <span className="text-sm font-semibold text-primary-800">
                    من القرآن الكريم
                  </span>
                </div>

                <blockquote className="mt-6 text-center text-2xl font-semibold leading-[2] text-primary-950">
                  ﴿{post.verse.text}﴾
                </blockquote>

                <p className="mt-4 text-center text-sm text-primary-700">
                  سورة {post.verse.reference}
                </p>
              </div>
            )}

            {/* Hadith */}
            {post.hadith && (
              <div className="my-10 rounded-3xl border border-secondary-100 bg-secondary-50 p-7">
                <p className="text-sm font-semibold text-secondary-800">
                  من السنة النبوية
                </p>

                <blockquote className="mt-5 text-xl font-semibold leading-[2] text-neutral-900">
                  «{post.hadith.text}»
                </blockquote>

                <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-neutral-500">
                    {post.hadith.reference}
                  </p>

                  <a
                    href={post.hadith.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700"
                  >
                    التحقق من المصدر
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
            )}

            {/* Source */}
            <div className="mt-10 rounded-2xl bg-neutral-50 p-5">
              <p className="text-xs font-medium text-neutral-500">
                المصدر
              </p>

              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-700"
              >
                {post.source}
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
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