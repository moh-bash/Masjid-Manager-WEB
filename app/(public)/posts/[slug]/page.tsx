import { notFound } from "next/navigation";
import PostDetails from "@/components/home/PostDetails";
import { getPostBySlug } from "@/lib/features/post/services/posts.service";

interface PostDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostDetailsPage({
  params
}: PostDetailsPageProps) {
  const { slug } = await params;


  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-neutral-50 text-neutral-900">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <p>
            حدث خطأ أثناء تحميل المنشور. يرجى المحاولة مرة أخرى لاحقًا.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-neutral-50 text-neutral-900"
    >
      <PostDetails post={post} />
    </div>
  );
}