import { TableColumn } from "@/components/UI/data-table/types";
import { Recitation, Sura } from "@/lib/features/recitation/types";
import { formatDate } from "@/lib/utils/format-date";
import suras from "@/lib/data/suras.json";

const suraList = suras as unknown as Sura[];

function getSuraName(number: number): string {
  return suraList.find((s) => s.number === number)?.name ?? `سورة ${number}`;
}

function getScoreBadge(score: number) {
  if (score >= 90) {
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
        {score}% · ممتاز
      </span>
    );
  }
  if (score >= 75) {
    return (
      <span className="inline-flex items-center rounded-full bg-sky-50 px-2.5 py-1 text-xs font-semibold text-sky-700">
        {score}% · جيد جداً
      </span>
    );
  }
  if (score >= 50) {
    return (
      <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
        {score}% · مقبول
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-red-600">
      {score}% · يحتاج تحسين
    </span>
  );
}

export default function getRecitationsColumns(): TableColumn<Recitation>[] {
  return [
    {
      key: "index",
      header: "#",
      className: "text-center",
      render: (_, index) => index + 1,
    },
    {
      key: "student",
      header: "الطالب",
      render: (recitation) => (
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#3eb1d3]/10 text-sm font-bold text-[#3eb1d3]">
            {recitation.student.name.charAt(0)}
          </div>
          <span className="font-medium text-gray-800">
            {recitation.student.name}
          </span>
        </div>
      ),
    },
    {
      key: "suraNumber",
      header: "السورة",
      render: (recitation) => (
        <span className="font-medium text-gray-700">
          {getSuraName(recitation.suraNumber)}
        </span>
      ),
    },
    {
      key: "ayahs",
      header: "الآيات",
      render: (recitation) => (
        <span className="text-gray-600">
          {recitation.startAyah} - {recitation.endAyah}
        </span>
      ),
    },
    {
      key: "score",
      header: "الدرجة",
      render: (recitation) => getScoreBadge(recitation.score),
    },
    {
      key: "circle",
      header: "الحلقة",
      render: (recitation) =>
        recitation.session.circle.name ?? "—",
    },
    {
      key: "teacher",
      header: "المعلم",
      render: (recitation) => recitation.teacher?.name ?? "—",
    },
    {
      key: "date",
      header: "تاريخ الجلسة",
      render: (recitation) => formatDate(recitation.session.date),
    },
    {
      key: "createdAt",
      header: "تاريخ التسجيل",
      className: "text-center",
      render: (recitation) => formatDate(recitation.createdAt),
    },
  ];
}