"use client";

import { useEffect, useState } from "react";
import DashboardPage from "@/components/dashboard/DashboardPage";
import DataTable from "@/components/UI/data-table/DataTable";
import getRecitationsColumns from "@/components/recitation/columns/recitationsColumn";
import AdminRecitationFilters, {
  AdminRecitationFiltersValue,
} from "@/components/recitation/AdminRecitationFilters";
import { getAllCircles } from "@/lib/features/circle/services/circle.service";
import { getRecitations } from "@/lib/features/recitation/services/recitation.service";
import { Recitation } from "@/lib/features/recitation/types";
import { PaginationMeta } from "@/lib/types";
import { BookOpen, Loader, MessagesSquare, TableProperties } from "lucide-react";

interface CircleOption {
  id: string;
  name: string;
}

interface TeacherOption {
  id: string;
  name: string;
}

const PAGE_SIZE = 10;

function getErrorMessage(error: unknown): string {
  const err = error as { response?: { data?: { message?: unknown } } };
  const msg = err.response?.data?.message;
  return Array.isArray(msg)
    ? msg.join("، ")
    : typeof msg === "string"
      ? msg
      : "حدث خطأ أثناء جلب البيانات";
}

export default function AdminRecitationsPage() {
  const [filters, setFilters] = useState<AdminRecitationFiltersValue>({
    circleId: "",
    teacherId: "",
    date: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [recitations, setRecitations] = useState<Recitation[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [totalRecitations, setTotalRecitations] = useState<number>(0);
  const [circles, setCircles] = useState<CircleOption[]>([]);
  const [teachers, setTeachers] = useState<TeacherOption[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    let active = true;

    async function run() {
      await Promise.resolve();
      if (!active) return;
      setIsLoading(true);
      setMessage("");

      try {
        const response = await getRecitations({
          page: currentPage,
          limit: PAGE_SIZE,
          circleId: filters.circleId || undefined,
          teacherId: filters.teacherId || undefined,
          date: filters.date || undefined,
        });
        if (active) {
          setRecitations(response.data);
          setPagination(response.meta);
        }
      } catch (error) {
        if (active) {
          setMessage(getErrorMessage(error));
          setRecitations([]);
          setPagination(null);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    run();

    return () => {
      active = false;
    };
  }, [currentPage, filters]);

  useEffect(() => {
    let active = true;

    async function loadFilterOptions() {
      try {
        const [circlesResponse, totalResponse] = await Promise.all([
          getAllCircles(1, 100),
          getRecitations({ page: 1, limit: 1 }),
        ]);

        if (!active) return;

        const options = (circlesResponse.data ?? []).map((circle) => ({
          id: circle.id,
          name: circle.name,
        }));
        setCircles(options);

        const teacherMap = new Map<string, TeacherOption>();
        (circlesResponse.data ?? []).forEach((circle) => {
          if (circle.teacher?.id && !teacherMap.has(circle.teacher.id)) {
            teacherMap.set(circle.teacher.id, {
              id: circle.teacher.id,
              name: circle.teacher.name,
            });
          }
        });
        setTeachers(Array.from(teacherMap.values()));

        setTotalRecitations(totalResponse.meta?.total ?? 0);
      } catch (error) {
        console.error("Error loading filter options:", error);
      }
    }

    loadFilterOptions();

    return () => {
      active = false;
    };
  }, []);

  const handleFiltersChange = (value: AdminRecitationFiltersValue) => {
    setFilters(value);
    setCurrentPage(1);
  };

  const columns = getRecitationsColumns();

  return (
    <DashboardPage>
      <div className="mb-5">
        <h2 className="text-3xl font-bold">التلاوات</h2>
        <p className="mt-1 text-sm text-gray-500">
          سجل كامل بالتلاوات المسجلة مع إمكانية التصفية حسب الحلقة والمعلم أو
          تاريخ الجلسة.
        </p>
      </div>

      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#3eb1d3]/10">
            <BookOpen size={22} className="text-[#3eb1d3]" />
          </div>
          <div>
            <p className="text-xs text-gray-500">إجمالي التلاوات المسجلة</p>
            <p className="text-2xl font-bold text-gray-900">
              {totalRecitations}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <TableProperties size={22} className="text-primary" />
          </div>
          <div>
            <p className="text-xs text-gray-500">التلاوات المطابقة للفلاتر</p>
            <p className="text-2xl font-bold text-gray-900">
              {pagination?.total ?? 0}
            </p>
          </div>
        </div>
      </div>

      <AdminRecitationFilters
        circles={circles}
        teachers={teachers}
        value={filters}
        onChange={handleFiltersChange}
      />

      <div className="mt-5">
        <DataTable
          data={recitations}
          columns={columns}
          emptyMessage={
            isLoading
              ? "جاري التحميل..."
              : message
                ? message
                : "لا توجد تلاوات"
          }
          Icon={isLoading ? Loader : message ? MessagesSquare : BookOpen}
          classIcon={
            isLoading
              ? "animate-spin"
              : message
                ? "text-red-500"
                : "text-slate-400"
          }
          getRowKey={(recitation) => recitation.id}
          pagination={{
            currentPage,
            totalPages: pagination?.totalPages || 1,
            totalItems: pagination?.total || 0,
            pageSize: PAGE_SIZE,
            onPageChange: setCurrentPage,
          }}
        />
      </div>
    </DashboardPage>
  );
}