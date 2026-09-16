import Link from "next/link";
import DashboardPage from "@/components/dashboard/DashboardPage";
import Button from "@/components/UI/Button";
import RecitationForm from "@/components/recitation/RecitationForm";
import { getSessionByDate } from "@/lib/features/attendance/services/attendance.service";
import { AttendanceStatus } from "@/lib/features/attendance/types";
import { ArrowRight, CalendarX2 } from "lucide-react";

export default async function AddRecitationForStudentPage({
  params,
}: {
  params: Promise<{ circleId: string; studentId: string }>;
}) {
  const { circleId, studentId } = await params;
  const today = new Date().toISOString().split("T")[0];

  let session: Awaited<ReturnType<typeof getSessionByDate>>;
  try {
    session = await getSessionByDate(circleId, today);
  } catch (error) {
    console.error("Error loading session for recitation:", error);
    session = null;
  }

  const attendee = (session?.attendances ?? []).find(
    (a) =>
      a.studentId === studentId &&
      (a.status === AttendanceStatus.PRESENT ||
        a.status === AttendanceStatus.LATE)
  );

  const noSession = !session || !attendee;

  return (
    <DashboardPage>
      <div className="py-4">
        <Link
          href={`/teacher/${circleId}/recitation/add`}
          className="inline-flex items-center gap-1.5 text-sm text-[#3eb1d3] font-medium hover:underline"
        >
          <ArrowRight size={16} />
          العودة لقائمة الطلاب
        </Link>
      </div>

      {noSession ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-50 flex items-center justify-center">
            <CalendarX2 size={28} className="text-red-500" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-800 text-red-600">
              تعذّر عرض الطالب
            </h2>
            <p className="text-gray-500 text-sm mt-2 max-w-md mx-auto">
              لم يتم العثور على هذا الطالب ضمن طلاب جلسة اليوم، أو لا توجد
              جلسة مسجلة لهذا اليوم بعد.
            </p>
          </div>
          <Button href={`/teacher/${circleId}/recitation/add`} variant="outline">
            العودة لقائمة الطلاب
          </Button>
        </div>
      ) : (
        <RecitationForm
          circleId={circleId}
          studentId={attendee.studentId}
          studentName={attendee.studentName}
        />
      )}
    </DashboardPage>
  );
}