"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import Button from "@/components/UI/Button";
import DataTable from "@/components/UI/data-table/DataTable";
import { useToast } from "@/context/toast";
import { Student } from "@/lib/features/student/types";
import {
  getStudentsByMosque,
  deleteStudent,
} from "@/lib/features/student/services/student.service";
import { getStudentColumns } from "@/components/student/columns/studentColumn";
import { PaginationMeta } from "@/lib/types";
import { Loader, MessagesSquare, Users } from "lucide-react";

export default function MosqueStudentsPage() {
  const params = useParams();
  const mosqueId = params.mosqueId as string;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [students, setStudents] = useState<Student[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);

  const { showToast } = useToast();

  useEffect(() => {
    if (mosqueId) {
      fetchStudents(currentPage);
    }
  }, [currentPage, mosqueId]);

  async function fetchStudents(page: number) {
    try {
      setLoading(true);
      setMessage("");
      const response = await getStudentsByMosque(mosqueId, page);
      setStudents(response.data);
      setPagination(response.meta);
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "حدث خطأ أثناء جلب بيانات الطلاب"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteStudent(id: string) {
    if (!window.confirm("هل أنت متأكد من حذف هذا الطالب نهائياً؟")) return;

    try {
      const response = await deleteStudent(id);
      showToast({
        message: response.message || "تم حذف الطالب بنجاح",
        type: "success",
      });
      fetchStudents(currentPage);
    } catch (error: any) {
      showToast({
        message: error.response?.data?.message || "حدث خطأ أثناء حذف الطالب",
        type: "danger",
      });
    }
  }

  const columns = getStudentColumns(mosqueId, handleDeleteStudent);

  return (
    <DashboardPage>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">طلاب المسجد</h2>
          <p className="text-slate-500 mt-1 text-sm">
            إدارة الطلاب، متابعة حالاتهم، ونقلهم بين الحلقات القرآنية.
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          href={`/mosque/${mosqueId}/students/add`}
        >
          إضافة طالب جديد
        </Button>
      </div>

      {/* Data Table */}
      <DataTable
        data={students}
        columns={columns}
        emptyMessage={
          isLoading
            ? "جاري تحميل بيانات الطلاب..."
            : message
            ? message
            : "لا يوجد طلاب مسجلين في هذا المسجد حتى الآن"
        }
        Icon={isLoading ? Loader : message ? MessagesSquare : Users}
        classIcon={
          isLoading
            ? "animate-spin text-primary"
            : message
            ? "text-red-500"
            : "text-slate-400"
        }
        getRowKey={(student) => student.id}
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