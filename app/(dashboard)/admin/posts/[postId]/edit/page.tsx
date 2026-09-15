import DashboardPage from "@/components/dashboard/DashboardPage";
import PostForm from "@/components/posts/PostForm";
import { getPostBySlug } from "@/lib/features/post/services/posts.service";


interface EditPagePostParams {
    params: Promise<{
        postId: string;
    }>;
}

export default async function editPagePost({
    params
}: EditPagePostParams) {
    const { postId } = await params;

    let postData: any = null;

    async function fetchPostData(postId: string) {
        try {
        const res = await getPostBySlug(postId);
        postData = res;
        } catch (error) {
        console.error("Error fetching post data:", error);
        }
    }

    await fetchPostData(postId);

    return (
        <DashboardPage>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">إضافة مقال جديد</h1>
        <p className="text-gray-600 mt-1">قم بإدخال بيانات المقال ومحتواه باستخدام محرر النصوص المتقدم.</p>
      </div>
      
      <PostForm initialData={postData} />
    </DashboardPage>
    )
}
