"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import StudentForm from "@/components/student/StudentForm";
import { getStudentById } from "@/lib/features/student/services/student.service";
import { Student } from "@/lib/features/student/types";
import { Loader2 } from "lucide-react";

export default function EditStudentPage() {
  const params = useParams();
  const router = useRouter();
  const mosqueId = params.mosqueId as string;
  const studentId = params.studentId as string;

  const [initialData, setInitialData] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStudent() {
      try {
        const data = await getStudentById(studentId);
        setInitialData(data);
      } catch (err: any) {
        setError("تعذر جلب بيانات الطالب، قد يكون محذوفاً أو لا تملك صلاحية الوصول.");
        setTimeout(() => {
          router.push(`/manager/mosques/${mosqueId}/students`);
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    }

    if (studentId) {
      fetchStudent();
    }
  }, [studentId, mosqueId, router]);

  if (isLoading) {
    return (
      <DashboardPage>
        <div className="flex h-64 flex-col items-center justify-center gap-4 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>جاري تحميل بيانات الطالب...</p>
        </div>
      </DashboardPage>
    );
  }

  if (error || !initialData) {
    return (
      <DashboardPage>
        <div className="flex h-64 items-center justify-center rounded-xl bg-red-50 text-red-500">
          {error}
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage>
      <StudentForm mosqueId={mosqueId} initialData={initialData} />
    </DashboardPage>
  );
}