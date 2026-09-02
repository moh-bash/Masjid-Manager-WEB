import { BookOpen, UserRound, ArrowRightLeft, User, Calendar } from "lucide-react";
import { notFound } from "next/navigation";

import DashboardPage from "@/components/dashboard/DashboardPage";
import { getStudentById } from "@/lib/features/student/services/student.service";
import { getMosqueCircles } from "@/lib/features/circle/services/circle.service";
import { Circle } from "@/lib/features/circle/types";
import { Student } from "@/lib/features/student/types";
import { InfoItem } from "@/components/UI/infoItem";
import TransferStudentForm from "@/components/student/TransferStudentForm";

export default async function TransferStudentPage({
  params,
}: {
  params: { mosqueId: string; studentId: string };
}) {
  const { mosqueId, studentId } = await params;

  let student: Student;
  let availableCircles: Circle[] = [];

  try {
    const [fetchedStudent, circlesResponse] = await Promise.all([
      getStudentById(studentId),
      getMosqueCircles(mosqueId, 1), 
    ]);

    student = fetchedStudent;
    availableCircles = circlesResponse.data || [];
  } catch (error) {
    console.error("Error fetching data for student transfer:", error);
    notFound();
  }

  const joinDate = student.activeCircle?.joinDate
    ? new Date(student.activeCircle.joinDate).toLocaleDateString("ar-SA", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <DashboardPage>
      <div className="">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-gray-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-2xl font-bold text-gray-900">
              <ArrowRightLeft className="text-primary" size={26} />
              نقل الطالب إلى حلقة جديدة
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              قم باختيار حلقة جديدة لنقل الطالب إليها. سيتم حفظ الحلقة الحالية في سجل الحلقات السابقة للطالب.
            </p>
          </div>
        </div>

        {/* Current State Info */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
              <UserRound className="text-gray-400" size={20} />
              <h2 className="font-bold text-gray-900">بيانات الطالب</h2>
            </div>
            <div className="space-y-3">
              <InfoItem label="الاسم" value={student.name} icon={<User className="text-gray-400" size={16} />} />
              <InfoItem label="العمر" value={`${student.age} سنة`} icon={<User className="text-gray-400" size={16} />} />
              <InfoItem label="اسم الأم" value={student.motherName} icon={<User className="text-gray-400" size={16} />} />
            </div>
          </section>

          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center gap-3 border-b border-gray-100 pb-3">
              <BookOpen className="text-indigo-500" size={20} />
              <h2 className="font-bold text-gray-900">الحلقة الحالية</h2>
            </div>
            <div className="space-y-3">
              {student.activeCircle ? (
                <>
                  <InfoItem label="اسم الحلقة" value={student.activeCircle.name} icon={<BookOpen className="text-indigo-500" size={16} />} />
                  {joinDate && <InfoItem label="تاريخ الانضمام" value={joinDate} icon={<Calendar className="text-gray-400" size={16} />} />}
                </>
              ) : (
                <div className="py-2 text-sm text-gray-500">
                  الطالب غير مسجل في أي حلقة حالياً.
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Client Component Form */}
        <TransferStudentForm
          student={student}
          mosqueId={mosqueId}
          availableCircles={availableCircles}
        />
      </div>
    </DashboardPage>
  );
}