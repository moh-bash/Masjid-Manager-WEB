import DashboardPage from '@/components/dashboard/DashboardPage';
import PostForm from '@/components/posts/PostForm';

export default function CreatePostPage() {
  return (
    <DashboardPage>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">إضافة مقال جديد</h1>
        <p className="text-gray-600 mt-1">قم بإدخال بيانات المقال ومحتواه باستخدام محرر النصوص المتقدم.</p>
      </div>
      
      <PostForm />
    </DashboardPage>
  );
}