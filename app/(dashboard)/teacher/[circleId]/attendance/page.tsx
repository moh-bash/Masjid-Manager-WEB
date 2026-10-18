import { Suspense } from "react";
import Button from "@/components/UI/Button";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { getStudentsByCircle } from "@/lib/features/student/services/student.service";
import { Student } from "@/lib/features/student/types";
import AttendanceManager from "@/components/attendance/AttendanceManager";

interface PageProps {
  params: Promise<{
    circleId: string;
  }>;
}

export default async function CircleAttendancePage({ params }: PageProps) {
  const { circleId } = await params;

  let students: Student[] = [];
  let hasError = false;

  try {
    const studentsResponse = await getStudentsByCircle(circleId, 1, 100);
    students = studentsResponse.data || [];
  } catch (error) {
    console.error("Error loading attendance page:", error);
    hasError = true;
  }

  if (hasError) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-4 text-center bg-white rounded-lg shadow-sm border border-gray-100 p-8">
        <h2 className="text-xl font-bold text-red-600">حدث خطأ أثناء جلب بيانات الحلقة</h2>
        <p className="text-gray-600">يرجى التأكد من صلاحياتك أو المحاولة لاحقاً.</p>
        <Button href={`/teacher/${circleId}`} variant="outline">
          العودة لصفحة الحلقة
        </Button>
      </div>
    );
  }

  return (
    <DashboardPage>
      <div className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">سجل التفقد اليومي</h1>
          <p className="mt-1 text-sm text-slate-500">
            اختر التاريخ وقم بتسجيل حضور وغياب طلاب الحلقة.
          </p>
        </header>

        <Suspense fallback={<div className="p-10 text-center">جاري تجهيز السجل...</div>}>
          <AttendanceManager circleId={circleId} students={students} />
        </Suspense>
      </div>
    </DashboardPage>
  );
}
