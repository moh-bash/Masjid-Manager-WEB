import { getAllPosts } from "@/lib/features/post/services/posts.service";
import { AlertCircle, BookOpen } from "lucide-react";
import PostsSection from "./PostsSection";

export default async function PostsSectionAsync() {
  let posts;

  try {
    const response = await getAllPosts();
    posts = response.data;
  } catch {
    return (
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-danger-100 bg-danger-50 px-6 py-4">
            <AlertCircle className="h-5 w-5 text-danger" />
            <p className="text-sm font-medium text-danger">
              حدث خطأ أثناء تحميل المنشورات
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <section className="bg-white px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-7xl text-center">
          <div className="inline-flex flex-col items-center gap-4 rounded-2xl border border-neutral-200 bg-neutral-50 px-8 py-10">
            <BookOpen className="h-10 w-10 text-neutral-400" />
            <div>
              <p className="text-lg font-semibold text-neutral-700">
                لا توجد منشورات بعد
              </p>
              <p className="mt-1 text-sm text-neutral-500">
                سيتم عرض المنشورات هنا إذا توفرت
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return <PostsSection posts={posts.slice(0, 3)} />;
}
