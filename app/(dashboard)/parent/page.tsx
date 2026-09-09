"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, AlertCircle, Loader2, PlusCircle } from "lucide-react";
import ChildCard from "@/components/parent/ChildCard";
import { LinkedChild } from "@/lib/features/student/types";
import { getMyChildren } from "@/lib/features/student/services/student.service";
import Button from "@/components/UI/Button";
import DashboardPage from "@/components/dashboard/DashboardPage";

export default function MyChildrenPage() {
  const [children, setChildren] = useState<LinkedChild[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMyChildren();
        setChildren(data);
      } catch (err: any) {
        setError("حدث خطأ أثناء جلب بيانات الأبناء. يرجى المحاولة لاحقاً.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchChildren();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="text-gray-500 font-medium">جاري تحميل بيانات الأبناء...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center">
        <div className="flex flex-col items-center text-center p-8 bg-red-50 rounded-2xl max-w-md border border-red-100">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-lg font-bold text-red-900 mb-2">عذراً، حدث خطأ</h3>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-4 py-2 bg-red-100 text-red-700 font-medium rounded-lg hover:bg-red-200 transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardPage>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex justify-between items-center text-right w-full">
          <div className="flex items-center justify-end gap-3 mb-2">
            <div className="p-2 bg-primary/10 text-primary rounded-lg">
              <Users size={28} strokeWidth={2} />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">أبنائي</h1>
          </div>
          <Button
              href="/parent/link"
              className="flex items-center gap-2 text-sm text-primary font-bold hover:bg-primary/5 px-4 py-2 rounded-lg transition"
            >
              <PlusCircle size={18} />
              <span>إضافة طالب آخر</span>
            </Button>
        </div>
      </div>

    {/* empty state */}
      {children.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border border-dashed border-gray-300 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Users size={32} className="text-gray-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">لا يوجد أبناء مرتبطين بحسابك</h3>
          <p className="text-gray-500 max-w-md mb-8">
            لم تقم بربط أي طالب بحسابك حتى الآن. احصل على كود الربط من معلم الحلقة لإضافة ابنك ومتابعة تقدمه.
          </p>
          <Button
            href="/parent/link"
            className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold hover:bg-primary/90 transition-all shadow-sm hover:shadow"
          >
            <PlusCircle size={20} />
            <span>ربط طالب جديد</span>
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            {children.map((child) => (
              <ChildCard key={child.id} child={child} />
            ))}
          </div>
        </div>
      )}
    </DashboardPage>
  );
}