import { notFound } from "next/navigation";
import homeData from "@/components/home/home.json";
import PostDetails from "@/components/home/PostDetails";

interface PostDetailsPageProps {
  params: Promise<{
    postId: string;
  }>;
}

export default async function PostDetailsPage({
  params,
}: PostDetailsPageProps) {
  const { postId } = await params;

  const post = homeData.posts.find(
    (item) => item.id === postId
  );

  if (!post) {
    notFound();
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