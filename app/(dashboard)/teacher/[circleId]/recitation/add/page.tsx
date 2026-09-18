import Link from "next/link";
import DashboardPage from "@/components/dashboard/DashboardPage";
import Button from "@/components/UI/Button";
import { getSessionByDate } from "@/lib/features/attendance/services/attendance.service";
import { AttendanceStatus } from "@/lib/features/attendance/types";
import { CalendarX2, ChevronLeft, Users } from "lucide-react";

export default async function AddRecitationPage({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) {
  const { circleId } = await params;
  const today = new Date().toISOString().split("T")[0];

  let session: Awaited<ReturnType<typeof getSessionByDate>>;
  try {
    session = await getSessionByDate(circleId, today);
  } catch (error) {
    console.error("Error loading session for recitation:", error);
    session = null;
  }

  const attendees =
    (session?.attendances ?? [])
      .filter(
        (a) =>
          a.status === AttendanceStatus.PRESENT ||
          a.status === AttendanceStatus.LATE
      )
      .map((a) => ({
        studentId: a.studentId,
        studentName: a.studentName,
      })) ?? [];

  const noSession = !session || attendees.length === 0;

  return (
    <DashboardPage>
      <header>
        <div className="py-4">
          <h1 className="text-lg font-semibold text-gray-800">
            إضافة تلاوة لطلاب الحلقة
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            اختر طالباً من طلاب جلسة اليوم لبدء تسجيل تلاوته
          </p>
        </div>
      </header>

      {noSession ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <CalendarX2 size={28} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 text-red-600">
              لا توجد جلسة اليوم
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              لم يتم إنشاء جلسة اليوم بعد. يرجى تسجيل الحضور أولاً لإنشاء
              الجلسة، ثم العودة لتسجيل التلاوات.
            </p>
          </div>
          <div className="flex items-center justify-center gap-3">
            <Button href={`/teacher/${circleId}/attendance`} variant="outline">
              سجل التفقد اليومي
            </Button>
            <Button href={`/teacher/${circleId}`} variant="outline">
              العودة للحلقة
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users size={18} className="text-[#3eb1d3]" />
            <h2 className="text-sm font-semibold text-gray-700">
              طلاب جلسة اليوم ({attendees.length})
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {attendees.map((student) => (
              <Link
                key={student.studentId}
                href={`/teacher/${circleId}/recitation/add/${student.studentId}`}
                className="group flex items-center justify-between gap-3 p-4 rounded-2xl border border-gray-100 bg-white text-right transition-all duration-200 hover:border-[#3eb1d3] hover:bg-[#3eb1d3]/5 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#3eb1d3]/10 text-[#3eb1d3] flex items-center justify-center shrink-0 text-sm font-bold">
                    {student.studentName.charAt(0)}
                  </div>
                  <span className="font-medium text-gray-800 text-sm">
                    {student.studentName}
                  </span>
                </div>
                <ChevronLeft
                  size={18}
                  className="text-gray-300 transition-colors group-hover:text-[#3eb1d3]"
                />
              </Link>
            ))}
          </div>
        </div>
      )}
    </DashboardPage>
  );
}