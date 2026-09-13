'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { deletePostById, getAllPosts } from '@/lib/features/post/services/posts.service';
import { Post } from '@/lib/features/post/types';
import Button from '@/components/UI/Button';

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getAllPosts();
      const postsData = Array.isArray(response) ? response : (response as any).data || [];
      setPosts(postsData);
    } catch (err: any) {
      setError(err.message || 'حدث خطأ أثناء جلب المقالات');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`هل أنت متأكد أنك تريد حذف المقال: "${title}"؟\nهذا الإجراء لا يمكن التراجع عنه.`)) {
      return;
    }

    setIsDeleting(id);
    try {
      await deletePostById(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err: any) {
      alert(err.message || 'فشل حذف المقال، يرجى المحاولة مرة أخرى.');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">إدارة المقالات</h1>
        </div>
        <Button
          href="/admin/posts/add"
          size="md"
        >
          إضافة مقال
        </Button>
      </div>

      {/* معالجة الحالات المختلفة (Loading, Error, Empty, Success) */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600 mb-4"></div>
          <p className="text-gray-500 font-medium">جاري تحميل المقالات...</p>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-6 rounded-lg text-center">
          <p className="font-semibold mb-2">عذراً، فشل تحميل البيانات</p>
          <p className="text-sm mb-4">{error}</p>
          <button 
            onClick={fetchPosts}
            className="bg-red-100 hover:bg-red-200 text-red-800 px-4 py-2 rounded text-sm font-medium transition-colors"
          >
            إعادة المحاولة
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-lg border border-gray-200 shadow-sm text-center">
          <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5L18.5 7H20" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-1">لا توجد مقالات بعد</h3>
          <p className="text-gray-500 mb-4">ابدأ بإضافة أول مقال للمدونة.</p>
          <Link
            href="/dashboard/posts/create"
            className="text-primary-600 hover:text-primary-800 font-medium text-sm"
          >
            + إنشاء مقال جديد
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-right">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المقال
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التصنيف
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    تاريخ الإنشاء
                  </th>
                  <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {posts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-16 relative rounded overflow-hidden bg-gray-100 border border-gray-200">
                          {post.image ? (
                            <Image 
                              src={post.image} 
                              alt={post.title} 
                              fill 
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex items-center justify-center w-full h-full text-gray-400 text-xs">لا صورة</span>
                          )}
                        </div>
                        <div className="mr-4">
                          <div className="text-sm font-semibold text-gray-900 line-clamp-1 max-w-[200px]" title={post.title}>
                            {post.title}
                          </div>
                          <div className="text-sm text-gray-500 line-clamp-1 max-w-[200px]" title={post.slug}>
                            {post.slug}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {/* عرض اسم التصنيف إذا كان موجوداً */}
                      {post.category || <span className="text-gray-400 italic">غير مصنف</span>}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        post.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {post.isPublished ? 'منشور' : 'مسودة'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('ar-EG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-3">
                        <Link 
                          href={`/posts/${post.slug}`}
                          target="_blank"
                          className="text-gray-500 hover:text-gray-900 transition-colors"
                          title="عرض المقال"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </Link>
                        
                        <Link 
                          href={`/dashboard/posts/edit/${post.id}`}
                          className="text-indigo-600 hover:text-indigo-900 transition-colors"
                          title="تعديل المقال"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={isDeleting === post.id}
                          className={`${
                            isDeleting === post.id ? 'text-red-300' : 'text-red-600 hover:text-red-900'
                          } transition-colors`}
                          title="حذف المقال"
                        >
                          {isDeleting === post.id ? (
                            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}