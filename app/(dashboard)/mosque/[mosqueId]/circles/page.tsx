"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import Button from "@/components/UI/Button";
import DataTable from "@/components/UI/data-table/DataTable";
import { useToast } from "@/context/toast";
import { Circle } from "@/lib/features/circle/types";
import { getMosqueCircles, deleteCircle } from "@/lib/features/circle/services/circle.service";
import { getCircleColumns } from "@/components/circle/columns/circleColumn";
import { PaginationMeta } from "@/lib/types";
import { Loader, MessagesSquare, BookOpen } from "lucide-react";

export default function MosqueCirclesPage() {
  const params = useParams();
  const mosqueId = params.mosqueId as string;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [circles, setCircles] = useState<Circle[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  
  const { showToast } = useToast();

  useEffect(() => {
    if (mosqueId) {
      fetchCircles(currentPage);
    }
  }, [currentPage, mosqueId]);

  async function fetchCircles(page: number) {
    try {
      setLoading(true);
      setMessage("");
      const response = await getMosqueCircles(mosqueId, page);
      setCircles(response.data);
      setPagination(response.meta);
    } catch (error: any) {
      setMessage(error.response?.data?.message || "حدث خطأ أثناء جلب حلقات المسجد");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteCircle(id: string) {
    if (!window.confirm("هل أنت متأكد من حذف هذه الحلقة؟")) return;

    try {
      const response = await deleteCircle(id);
      showToast({
        message: response.message || "تم حذف الحلقة بنجاح",
        type: "success", 
      });
      fetchCircles(currentPage);
    } catch (error: any) {
      showToast({
        message: error.response?.data?.message || "حدث خطأ أثناء حذف الحلقة",
        type: "danger",
      });
    }
  }

  const columns = getCircleColumns(mosqueId, handleDeleteCircle);

  return (
    <DashboardPage>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">حلقات المسجد</h2>
          <p className="text-slate-500 mt-1 text-sm">
            إدارة الحلقات القرآنية، إضافة المعلمين، وتحديد المستويات.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          href={`/mosque/${mosqueId}/circles/add`}
        >
          إضافة حلقة جديدة
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={circles}
        columns={columns}
        emptyMessage={
          isLoading 
            ? "جاري تحميل الحلقات..." 
            : message 
              ? message 
              : "لا توجد حلقات مسجلة في هذا المسجد حتى الآن"
        }
        Icon={isLoading ? Loader : message ? MessagesSquare : BookOpen}
        classIcon={isLoading ? "animate-spin text-primary" : message ? "text-red-500" : "text-slate-400"}
        getRowKey={(circle) => circle.id}
        pagination={{
          currentPage,
          totalPages: pagination?.totalPages || 1,
          totalItems: pagination?.total || 0,
          pageSize: 10,
          onPageChange: setCurrentPage,
        }}
      />
    </DashboardPage>
  );
}