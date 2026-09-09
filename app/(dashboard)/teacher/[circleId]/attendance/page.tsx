import { Suspense } from "react";
import Button from "@/components/UI/Button";
import { getStudentsByCircle } from "@/lib/features/student/services/student.service";
import AttendanceManager from "@/components/attendance/AttendanceManager";

interface PageProps {
  params: {
    circleId: string;
  };
}

export default async function CircleAttendancePage({ params }: PageProps) {
  const { circleId } = await params;

  try {
    const studentsResponse = await getStudentsByCircle(circleId, 1, 100);
    const students = studentsResponse.data || [];

    return (
      <div className="p-6 max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">سجل التفقد اليومي</h1>
            <p className="text-gray-500 mt-1">اختر التاريخ وقم بتسجيل حضور وغياب طلاب الحلقة.</p>
          </div>
        </div>

        <Suspense fallback={<div className="p-10 text-center">جاري تجهيز السجل...</div>}>
          <AttendanceManager circleId={circleId} students={students} />
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error("Error loading attendance page:", error);
    
    // Error State
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
}