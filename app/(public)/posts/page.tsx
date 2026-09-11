import Link from "next/link";
import { ArrowRight } from "lucide-react";


import homeData from "@/components/home/home.json";
import PostCard from "@/components/home/PostCard";

export default function PostsPage() {
  const posts = homeData.posts;

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-neutral-50 text-neutral-900"
    >

        {/* Page Header */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
              العودة إلى الرئيسية
            </Link>

            <span className="block text-sm font-semibold text-primary">
              المنشورات
            </span>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              زادٌ من القرآن والعلم
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
              محتوى نافع ووقفات إيمانية وتربوية نشاركها مع زوار
              الموقع، لتبقى أبواب الخير والعلم مفتوحة للجميع.
            </p>
          </div>
        </section>

        {/* Posts */}
        <section className="px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">

            {posts.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-20 text-center">
                <h2 className="text-xl font-bold text-neutral-900">
                  لا توجد منشورات حاليًا
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  سيتم عرض المنشورات هنا عند توفرها.
                </p>
              </div>
            )}

          </div>
        </section>
    </div>
  );
}