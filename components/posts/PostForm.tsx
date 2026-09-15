'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { createPost, updatePostById } from '@/lib/features/post/services/posts.service';
import { useToast } from '@/context/toast';

const MarkdownEditor = dynamic(
  () => import('@/components/editor/MarkdownEditor'),
  { ssr: false, loading: () => <div className="min-h-[300px] bg-gray-100 animate-pulse rounded-md" /> }
);

interface PostFormProps {
  initialData?: {
    id: string;
    title: string;
    content: string;
    excerpt?: string;
    isPublished?: boolean;
    categoryId?: string;
    image?: string;
  };
}

export default function PostForm({ initialData }: PostFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(initialData?.title || '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [isPublished, setIsPublished] = useState<boolean>(initialData?.isPublished || false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { showToast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (excerpt) formData.append('excerpt', excerpt);
      formData.append('isPublished', String(isPublished));

      if (imageFile) {
        formData.append('image', imageFile);
      }

      if (initialData?.id) {
        await updatePostById(initialData.id, formData);
      } else {
        await createPost(formData);
      }

      router.push('/admin/posts');
      router.refresh();

    } catch (err: any) {
      setError(err.message || 'حدث خطأ غير متوقع');
      showToast({
        message: err.message || 'حدث خطأ غير متوقع',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl bg-white p-6 rounded-lg shadow-sm">
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">عنوان المقال *</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="أدخل عنوان المقال هنا"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">المقتطف / المقدمة (اختياري)</label>
        <textarea
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          rows={3}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="ملخص قصير يعرض في قائمة المقالات"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">الصورة الرئيسية {initialData ? '(اختياري)' : '*'}</label>
        <input
          type="file"
          accept="image/png, image/jpeg, image/webp"
          onChange={handleImageChange}
          required={!initialData && !imageFile} // مطلوبة فقط في الإنشاء إذا لم يتم اختيارها
          className="w-full border border-gray-300 rounded-md px-4 py-2 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
        />
        {imagePreview && (
          <div className="mt-4">
            <img src={imagePreview} alt="Preview" className="w-48 h-32 object-cover rounded-md border" />
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">محتوى المقال *</label>
        <MarkdownEditor markdown={content} onChange={setContent} />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="isPublished"
          checked={isPublished}
          onChange={(e) => setIsPublished(e.target.checked)}
          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
        />
        <label htmlFor="isPublished" className="ml-2 mr-2 block text-sm text-gray-900">
          نشر المقال فوراً (إتاحته للزوار)
        </label>
      </div>

      <div className="flex justify-end gap-4 pt-4 border-t">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
        >
          إلغاء
        </button>
        <button
          type="submit"
          disabled={isLoading || !content}
          className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading ? 'جاري الحفظ...' : initialData ? 'تحديث المقال' : 'إضافة المقال'}
        </button>
      </div>
    </form>
  );
}