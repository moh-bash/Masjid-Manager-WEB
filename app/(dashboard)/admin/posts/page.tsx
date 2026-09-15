"use client";

import DashboardPage from "@/components/dashboard/DashboardPage";
import getPostColumns from "@/components/posts/columns/PostColumn";
import Button from "@/components/UI/Button";
import DataTable from "@/components/UI/data-table/DataTable";
import { useToast } from "@/context/toast";
import { deletePostById, getPostsForAdmin } from "@/lib/features/post/services/posts.service";
import { Post } from "@/lib/features/post/types";
import { PaginationMeta } from "@/lib/types";
import { Loader, MessagesSquare, TableProperties } from "lucide-react";
import { useEffect, useState } from "react";

export default function PostsPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [messages, setMessages] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const { showToast } = useToast();

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  async function fetchPosts(page: number) {
    try {
      setLoading(true);
      setMessages(""); 
      
      const response = await getPostsForAdmin(); 
      setPosts(response.data);
      setPagination(response.meta);
    } catch (error: any) {
      setMessages(error.response?.data?.message || "حدث خطأ أثناء جلب المقالات");
       showToast({
        message: error.message || 'حدث خطأ غير متوقع',
        type: 'danger',
      });
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = async (id: string) => {
    try {
    setIsDeleting(true);
    await deletePostById(id);
    showToast({
      message: 'تم حذف المقال بنجاح',
      type: 'success',
    });
    fetchPosts(currentPage);
    } catch (error: any) {
      showToast({
        message: error.response?.data?.message || 'حدث خطأ أثناء حذف المقال',
        type: 'danger',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  const columns = getPostColumns(handleDelete, isDeleting);

  return (
    <DashboardPage>
      {/* header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">المقالات</h2>
        <Button
          variant="primary"
          size="md"
          href="/admin/posts/add"
        >
          إضافة
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={posts}
        columns={columns}
        emptyMessage={isLoading ? "جاري التحميل..." : messages ? messages : "لا توجد مقالات"}
        Icon={isLoading ? Loader : messages ? MessagesSquare : TableProperties}
        classIcon={isLoading ? "animate-spin" : messages ? "text-red-500" : "text-slate-400"}
        getRowKey={(post) => post.id.toString()}
        pagination={{
          currentPage,
          totalPages: pagination?.totalPages || 1,
          totalItems: pagination?.total || 0,
          pageSize: pagination?.limit || 10,
          onPageChange: setCurrentPage,
        }}
      />
    </DashboardPage>
  );
}