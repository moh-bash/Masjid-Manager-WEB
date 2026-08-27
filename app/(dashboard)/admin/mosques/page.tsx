"use client";
import DashboardPage from "@/components/dashboard/DashboardPage";
import Button from "@/components/UI/Button";
import DataTable from "@/components/UI/data-table/DataTable";
import { useToast } from "@/context/toast";
import { getMosqueColumns } from "@/lib/features/mosque/columns/mosqqueColumn";
import { deleteMosque, getMosques } from "@/lib/features/mosque/services/mosque.service";
import { Mosque, PaginationMeta } from "@/lib/features/mosque/types";
import {  Loader, Loader2, MessagesSquare,  TableProperties } from "lucide-react";
import { ElementType, useEffect, useState } from "react";




function Mosques() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [mosques, setMosques] = useState<Mosque[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [messages, setMessages] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(false);
  const {showToast} = useToast();

  useEffect(() => {
    fetchMosques(currentPage);
  }, [currentPage]);

  async function fetchMosques(page: number) {
    try {
      setLoading(true);
      const response = await getMosques(page);
      setMosques(response.data);
      setPagination(response.meta);
    } catch (error: any) {
      setMessages(error.response?.data?.message || "حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteMosque(id: string) {
    try {
      const response = await deleteMosque(id);
      setMessages(response.message);
      fetchMosques(currentPage);
      showToast({
        message: response.message,
        type: "danger",
      });
    } catch (error: any) {
      setMessages(error.response?.data?.message || "حدث خطأ أثناء حذف البيانات");
    }
  }


const columns = getMosqueColumns(handleDeleteMosque);
  return (
    <DashboardPage>    
      {/* header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-3xl font-bold">المساجد</h2>
        <Button
          variant="primary"
          size="md"
          href="/admin/mosques/add"
        >
          إضافة مسجد
        </Button>
      </div>
      <DataTable
        data={mosques}
        columns={columns}
        emptyMessage={isLoading ? "جاري التحميل..." : messages ? messages : "لا توجد بيانات"}
        Icon={isLoading ? Loader : messages ? MessagesSquare : TableProperties}
        classIcon={isLoading ? "animate-spin" : messages ? "text-red-500" : "text-slate-400"}
        getRowKey={(mosque) => mosque.id.toString()}
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

export default Mosques
