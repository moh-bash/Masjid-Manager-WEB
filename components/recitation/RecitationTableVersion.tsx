import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, CalendarDays, ChevronRight, Table2 } from "lucide-react";

import DashboardPage from "@/components/dashboard/DashboardPage";
import { getStudentById } from "@/lib/features/student/services/student.service";
import { Student } from "@/lib/features/student/types";
import { getRecitations } from "@/lib/features/recitation/services/recitation.service";
import { Recitation } from "@/lib/features/recitation/types";
import {
  calculateRecitationStats,
  formatSessionDate,
  getSuraName,
  scoreInfo,
} from "@/lib/features/recitation/recitation.helpers";

export const dynamic = "force-dynamic";

export default async function RecitationTableVersion({
  studentId
}: {
  studentId: string;
}) {

  let student: Student;
  try {
    student = await getStudentById(studentId);
  } catch (error) {
    console.error("Error fetching student details:", error);
    notFound();
  }

  let recitations: Recitation[] = [];
  let totalRecitations = 0;
  try {
    const response = await getRecitations({
      studentId,
      page: 1,
      limit: 50,
    });
    recitations = response.data ?? [];
    totalRecitations = response.meta?.total ?? recitations.length;
  } catch (error) {
    console.error("Error fetching student recitations:", error);
  }

  const stats = calculateRecitationStats(recitations);

  return (
    <>
      {recitations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-4">
            <BookOpen size={28} className="text-primary" />
          </div>
          <p className="text-gray-600 font-medium">لا توجد تلاوات مسجلة لهذا الطالب بعد</p>
          <p className="text-sm text-gray-500 mt-1">
            ستظهر التلاوات هنا فور تسجيلها من قبل المعلم
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-gray-100 flex-wrap">
            <p className="text-sm font-semibold text-gray-700 flex items-center gap-2">
              <Table2 size={15} className="text-primary" />
              تفاصيل التلاوات
            </p>
            <span className="text-xs font-semibold text-gray-500 bg-gray-100 rounded-full px-3 py-1">
              {stats.total} تلاوة · متوسط الدرجة {stats.averageScore}%
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-sm">
              <thead>
                <tr className="bg-gray-50 text-xs font-semibold text-gray-500 border-b border-gray-100">
                  <th className="px-4 py-3 whitespace-nowrap">السورة</th>
                  <th className="px-4 py-3 whitespace-nowrap">الآيات</th>
                  <th className="px-4 py-3 whitespace-nowrap">تاريخ الجلسة</th>
                  <th className="px-4 py-3 whitespace-nowrap">الحلقة</th>
                  <th className="px-4 py-3 whitespace-nowrap">المعلم</th>
                  <th className="px-4 py-3 whitespace-nowrap">الدرجة</th>
                  <th className="px-4 py-3 whitespace-nowrap">ملاحظات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recitations.map((recitation, index) => {
                  const score = scoreInfo(recitation.score);
                  return (
                    <tr
                      key={recitation.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50/40"}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                            {recitation.suraNumber}
                          </span>
                          <span className="font-semibold text-gray-800 whitespace-nowrap">
                            {getSuraName(recitation.suraNumber)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {recitation.startAyah} - {recitation.endAyah}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        <span className="flex items-center gap-1.5">
                          <CalendarDays size={13} className="text-gray-400" />
                          {formatSessionDate(recitation.session.date)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {recitation.session.circle?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-600 whitespace-nowrap">
                        {recitation.teacher?.name ?? "—"}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex text-xs font-semibold px-2.5 py-1 rounded-full ${score.className}`}
                        >
                          {recitation.score}% · {score.label}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500 max-w-[220px]">
                        {recitation.notes ? (
                          <span className="line-clamp-2">{recitation.notes}</span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
}