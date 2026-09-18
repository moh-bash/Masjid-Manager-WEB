import Link from "next/link";
import { notFound } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CalendarDays,
  ChevronRight,
  History,
  Layers,
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
  ScoreCategory,
  scoreInfo,
} from "@/lib/features/recitation/recitation.helpers";

export const dynamic = "force-dynamic";

const CATEGORIES: {
  category: ScoreCategory;
  label: string;
  badgeClass: string;
  barClass: string;
}[] = [
    {
      category: "EXCELLENT",
      label: "ممتاز (90 - 100)",
      badgeClass: "bg-emerald-50 text-emerald-700",
      barClass: "bg-emerald-500",
    },
    {
      category: "VERY_GOOD",
      label: "جيد جداً (75 - 89)",
      badgeClass: "bg-sky-50 text-sky-700",
      barClass: "bg-sky-500",
    },
    {
      category: "ACCEPTABLE",
      label: "مقبول (50 - 74)",
      badgeClass: "bg-amber-50 text-amber-700",
      barClass: "bg-amber-500",
    },
    {
      category: "NEEDS_IMPROVEMENT",
      label: "يحتاج تحسين (أقل من 50)",
      badgeClass: "bg-red-50 text-red-600",
      barClass: "bg-red-500",
    },
  ];

export default async function RecitationStatsVersion({
  studentId,
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
  try {
    const response = await getRecitations({ studentId, page: 1, limit: 100 });
    recitations = response.data ?? [];
  } catch (error) {
    console.error("Error fetching student recitations:", error);
  }

  const stats = calculateRecitationStats(recitations);

  const countByCategory = CATEGORIES.map((category) => ({
    ...category,
    count: recitations.filter(
      (r) => scoreInfo(r.score).category === category.category
    ).length,
  }));

  const bySuraMap = new Map<number, { count: number; totalScore: number }>();
  recitations.forEach((r) => {
    const entry = bySuraMap.get(r.suraNumber) ?? { count: 0, totalScore: 0 };
    entry.count += 1;
    entry.totalScore += r.score;
    bySuraMap.set(r.suraNumber, entry);
  });
  const bySura = Array.from(bySuraMap.entries())
    .map(([suraNumber, entry]) => ({
      suraNumber,
      count: entry.count,
      averageScore: Math.round(entry.totalScore / entry.count),
    }))
    .sort((a, b) => b.count - a.count || a.suraNumber - b.suraNumber);

  const maxSuraCount = Math.max(1, ...bySura.map((s) => s.count));

  const recentRecitations = [...recitations]
    .sort(
      (a, b) =>
        new Date(b.session.date).getTime() - new Date(a.session.date).getTime()
    )
    .slice(0, 5);

  return (
    <>
      {recitations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-primary-50 flex items-center justify-center mb-4">
            <BookOpen size={28} className="text-primary" />
          </div>
          <p className="text-gray-600 font-medium">لا توجد تلاوات مسجلة لهذا الطالب بعد</p>
          <p className="text-sm text-gray-500 mt-1">
            ستظهر الإحصائيات هنا فور تسجيل التلاوات من قبل المعلم
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
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
                <Layers size={13} className="text-indigo-500" />
                عدد السور
              </p>
              <p className="mt-1.5 text-2xl font-bold text-gray-900">{stats.uniqueSuras}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold text-gray-900">توزيع الدرجات</h2>
              <div className="space-y-3.5">
                {countByCategory.map((category) => {
                  const percentage = Math.round(
                    (category.count / stats.total) * 100
                  );
                  return (
                    <div key={category.category}>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2">
                          <span
                            className={`inline-block px-2 py-0.5 rounded-full font-semibold ${category.badgeClass}`}
                          >
                            {category.count}
                          </span>
                          <span className="font-medium text-gray-600">
                            {category.label}
                          </span>
                        </span>
                        <span className="font-semibold text-gray-400">
                          {percentage}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${category.barClass}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h2 className="mb-4 font-bold text-gray-900 flex items-center justify-between">
                التوزيع حسب السور
                <span className="text-xs font-medium text-gray-400">
                  {bySura.length} سورة متعود عليها
                </span>
              </h2>
              <div className="space-y-3">
                {bySura.slice(0, 8).map((sura) => {
                  const suraWidth = Math.round(
                    (sura.count / maxSuraCount) * 100
                  );
                  return (
                    <div key={sura.suraNumber} className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                        {sura.suraNumber}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="mb-1 flex items-center justify-between text-xs">
                          <span className="font-semibold text-gray-700 truncate">
                            {getSuraName(sura.suraNumber)}
                          </span>
                          <span className="text-gray-400 shrink-0">
                            {sura.count} تلاوة · متوسط {sura.averageScore}%
                          </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${suraWidth}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </div>
      )}
    </>
  );
}