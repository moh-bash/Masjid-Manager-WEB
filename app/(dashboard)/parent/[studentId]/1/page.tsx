import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BookOpen,
  CalendarDays,
  ChevronRight,
  FileText,
  Star,
  Trophy,
} from "lucide-react";

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

export default async function RecitationListVersionPage({
  params,
}: {
  params: Promise<{ studentId: string }>;
}) {
  const { studentId } = await params;

  let student: Student;
  try {
    student = await getStudentById(studentId);
  } catch (error) {
    console.error("Error fetching student details:", error);
    notFound();
  }

  let recitations: Recitation[] = [];
  try {
    const response = await getRecitations({ studentId, page: 1, limit: 50 });
    recitations = response.data ?? [];
  } catch (error) {
    console.error("Error fetching student recitations:", error);
  }

  const stats = calculateRecitationStats(recitations);

  return (
    <DashboardPage>
      <div className="mb-6">
        <Link
          href={`/parent/${studentId}`}
          className="mb-4 inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
        >
          <ChevronRight size={16} />
          رجوع إلى تفاصيل الطالب
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
            <BookOpen size={22} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2 sm:text-2xl">
              سجل التلاوة
              <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-semibold text-primary">
                عرض القائمة
              </span>
            </h1>
            <p className="text-sm text-gray-500">
              تلاوات {student.name} مرتبة من الأحدث إلى الأقدم
            </p>
          </div>
        </div>
      </div>

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
        <>
          <div className="grid grid-cols-2 gap-3 mb-5 lg:grid-cols-4">
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                <BookOpen size={13} className="text-primary" />
                إجمالي التلاوات
              </p>
              <p className="mt-1.5 text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                <Star size={13} className="text-amber-500" />
                متوسط الدرجة
              </p>
              <p className="mt-1.5 text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                <Trophy size={13} className="text-emerald-500" />
                أفضل درجة
              </p>
              <p className="mt-1.5 text-2xl font-bold text-gray-900">{stats.bestScore}%</p>
            </div>
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
              <p className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                <CalendarDays size={13} className="text-primary" />
                آخر تلاوة
              </p>
              <p className="mt-1.5 text-lg font-bold text-gray-900 leading-tight">
                {stats.lastRecitationDate ? formatSessionDate(stats.lastRecitationDate) : "—"}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {recitations.map((recitation) => {
              const score = scoreInfo(recitation.score);
              return (
                <div
                  key={recitation.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-sm font-bold text-primary">
                        {recitation.suraNumber}
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">
                          {getSuraName(recitation.suraNumber)}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                          <CalendarDays size={13} />
                          <span>{formatSessionDate(recitation.session.date)}</span>
                          {recitation.session.circle?.name && (
                            <>
                              <span>·</span>
                              <span>{recitation.session.circle.name}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <span
                      className={`shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full ${score.className}`}
                    >
                      {recitation.score}% · {score.label}
                    </span>
                  </div>

                  <div className="mt-3 flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-3 py-2.5">
                    <BookOpen size={15} className="text-primary shrink-0" />
                    <span className="font-medium">{getSuraName(recitation.suraNumber)}</span>
                    <span className="text-gray-400">·</span>
                    <span>
                      من الآية {recitation.startAyah} إلى {recitation.endAyah}
                    </span>
                    {recitation.teacher?.name && (
                      <>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-500">المعلم: {recitation.teacher.name}</span>
                      </>
                    )}
                  </div>

                  {recitation.notes && (
                    <p className="mt-2.5 flex items-start gap-1.5 text-xs text-gray-500">
                      <FileText size={13} className="mt-0.5 shrink-0 text-gray-400" />
                      <span>{recitation.notes}</span>
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </DashboardPage>
  );
}