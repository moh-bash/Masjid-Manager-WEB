import Link from "next/link";
import DashboardPage from "@/components/dashboard/DashboardPage";
import Button from "@/components/UI/Button";
import RecitationFilters from "@/components/recitation/RecitationFilters";
import { getStudentsByCircle } from "@/lib/features/student/services/student.service";
import { getCircleSessions } from "@/lib/features/attendance/services/attendance.service";
import { getRecitations } from "@/lib/features/recitation/services/recitation.service";
import { recitationListQuerySchema } from "@/lib/features/recitation/schema/recitations.schema";
import { Sura } from "@/lib/features/recitation/types";
import suras from "@/lib/data/suras.json";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  FileText,
  Plus,
} from "lucide-react";

export const dynamic = "force-dynamic";

const suraList = suras as unknown as Sura[];

function getSuraName(number: number): string {
  return suraList.find((s) => s.number === number)?.name ?? `سورة ${number}`;
}

function formatSessionDate(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString("ar");
}

function scoreInfo(score: number): { label: string; className: string } {
  if (score >= 90) {
    return { label: "ممتاز", className: "bg-emerald-50 text-emerald-700" };
  }
  if (score >= 75) {
    return { label: "جيد جداً", className: "bg-sky-50 text-sky-700" };
  }
  if (score >= 50) {
    return { label: "مقبول", className: "bg-amber-50 text-amber-700" };
  }
  return { label: "يحتاج تحسين", className: "bg-red-50 text-red-600" };
}

export default async function CircleRecitationPage(props: {
  params: Promise<{ circleId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { circleId } = await props.params;
  const sp = await props.searchParams;

  const queryResult = recitationListQuerySchema.safeParse({
    page: sp.page,
    studentId: sp.studentId,
    sessionId: sp.sessionId,
  });

  const filters = queryResult.success
    ? queryResult.data
    : { page: 1, studentId: undefined, sessionId: undefined };

  const [studentsResponse, sessions, recitationsResponse] = await Promise.all([
    getStudentsByCircle(circleId, 1, 100),
    getCircleSessions(circleId),
    getRecitations({
      page: filters.page,
      limit: 10,
      circleId,
      studentId: filters.studentId,
      sessionId: filters.sessionId,
    }),
  ]);

  const students = studentsResponse.data ?? [];
  const recitations = recitationsResponse.data ?? [];
  const meta = recitationsResponse.meta;

  const buildQuery = (page: number) => {
    const params = new URLSearchParams();
    if (filters.studentId) params.set("studentId", filters.studentId);
    if (filters.sessionId) params.set("sessionId", filters.sessionId);
    if (page > 1) params.set("page", String(page));
    const qs = params.toString();
    return qs ? `?${qs}` : "";
  };

  return (
    <DashboardPage>
      <header>
        <div className="py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">التلاوة</h1>
            <p className="text-sm text-gray-500 mt-1">
              سجل تلاوات طلاب الحلقة اليومية
            </p>
          </div>
          <Button
            size="md"
            href={`/teacher/${circleId}/recitation/add`}
            className="bg-[#3eb1d3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#36a0c0] transition-colors"
            leftIcon={<Plus size={16} />}
          >
            إضافة تلاوة
          </Button>
        </div>
      </header>

      <div className="space-y-4">
        <RecitationFilters
          circleId={circleId}
          students={students}
          sessions={sessions}
          activeStudentId={filters.studentId}
          activeSessionId={filters.sessionId}
        />

        {recitations.length > 0 ? (
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
                      <div className="w-10 h-10 rounded-full bg-[#3eb1d3]/10 text-[#3eb1d3] flex items-center justify-center shrink-0 text-sm font-bold">
                        {recitation.student.name.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">
                          {recitation.student.name}
                        </p>
                        <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-0.5">
                          <CalendarDays size={13} />
                          <span>
                            {formatSessionDate(recitation.session.date)}
                          </span>
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
                    <BookOpen size={15} className="text-[#3eb1d3] shrink-0" />
                    <span className="font-medium">{getSuraName(recitation.suraNumber)}</span>
                    <span className="text-gray-400">·</span>
                    <span>
                      من الآية {recitation.startAyah} إلى {recitation.endAyah}
                    </span>
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
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="w-16 h-16 mx-auto rounded-full bg-[#3eb1d3]/10 flex items-center justify-center mb-4">
              <BookOpen size={28} className="text-[#3eb1d3]" />
            </div>
            <p className="text-gray-600 text-sm">
              لا توجد تلاوات مسجلة
              {filters.studentId || filters.sessionId
                ? " مطابقة للفلاتر المحددة"
                : " لهذه الحلقة بعد"}
              . اضغط زر إضافة تلاوة لتسجيل أول تلاوة.
            </p>
          </div>
        )}

        {meta.totalPages > 1 && (
          <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-gray-100 p-3">
            <span className="text-xs text-gray-500 px-2">
              صفحة {meta.page} من {meta.totalPages} ({meta.total} تلاوة)
            </span>
            <div className="flex items-center gap-2">
              {meta.hasPreviousPage && (
                <Link
                  href={`/teacher/${circleId}/recitation${buildQuery(meta.page - 1)}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  <ChevronRight size={14} />
                  السابق
                </Link>
              )}
              {meta.hasNextPage && (
                <Link
                  href={`/teacher/${circleId}/recitation${buildQuery(meta.page + 1)}`}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  التالي
                  <ChevronLeft size={14} />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardPage>
  );
}