"use client";
import DashboardPage from "@/components/dashboard/DashboardPage";
import Button from "@/components/UI/Button";
import DataTable from "@/components/UI/data-table/DataTable";
import getUserColumns from "@/components/users/columns/usersColumn";
import { useToast } from "@/context/toast";
import { getAllusers } from "@/lib/features/auth/services/auth.service";
import { User } from "@/lib/features/auth/types";
import { PaginationMeta } from "@/lib/types";
import { Loader, MessagesSquare, TableProperties } from "lucide-react";
import { useEffect, useState } from "react";

function page() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [messages, setMessages] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { showToast } = useToast();

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  async function fetchUsers(page: number) {
    try {
      setLoading(true);
      const response = await getAllusers(page);
      setUsers(response.data);
      setPagination(response.meta);
    } catch (error: any) {
      setMessages(error.response?.data?.message || "حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);

    }
  }

  const columns = getUserColumns();

  return (
    <DashboardPage>
      {/* header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">المستخدمين</h2>
        <Button
          variant="primary"
          size="md"
          href="/admin/mosques/add"
        >
          إضافة
        </Button>
      </div>
      <DataTable
        data={users}
        columns={columns}
        emptyMessage={isLoading ? "جاري التحميل..." : messages ? messages : "لا توجد بيانات"}
        Icon={isLoading ? Loader : messages ? MessagesSquare : TableProperties}
        classIcon={isLoading ? "animate-spin" : messages ? "text-red-500" : "text-slate-400"}
        getRowKey={(user) => user.id.toString()}
        pagination={{
          currentPage,
          totalPages: pagination?.totalPages || 1,
          totalItems: pagination?.total || 0,
          pageSize: 10,
          onPageChange: setCurrentPage,
        }}
      />
    </DashboardPage>
  )
}

export default page
