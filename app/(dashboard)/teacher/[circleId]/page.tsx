import Link from "next/link";
import {
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  Users,
} from "lucide-react";
import DashboardPage from "@/components/dashboard/DashboardPage";
import { getCircleById } from "@/lib/features/circle/services/circle.service";

interface PageProps {
  params: Promise<{ circleId: string }>;
}

export const dynamic = "force-dynamic";

export default async function TeacherCirclePage({ params }: PageProps) {
  const { circleId } = await params;

  let circle = null;
  try {
    circle = await getCircleById(circleId);
  } catch (error) {
    console.error("Error fetching circle:", error);
  }

  const today = new Date().toLocaleDateString("ar", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const recordSections = [
    {
      href: `/teacher/${circleId}/attendance/report`,
      icon: CalendarDays,
      title: "تقرير الحضور والغياب",
      description: "سجل كامل الحضور والغياب عبر الجلسات",
    },
    {
      href: `/teacher/${circleId}/students`,
      icon: Users,
      title: "طلاب الحلقة",
      description: "إدارة بيانات الطلاب وحالات الانتساب",
      meta: circle ? `${circle.activeStudentsCount} طالب` : undefined,
    },
    {
      href: `/teacher/${circleId}/recitation`,
      icon: BookOpen,
      title: "سجل التلاوة",
      description: "تسجيل تلاوات الطلاب ومتابعة تقييماتهم",
    },
  ];

  return (
    <DashboardPage>
      <div className="space-y-8">
        <header>
          <h1 className="text-2xl font-bold text-slate-900">
            {circle ? `حلقة ${circle.name}` : "لوحة الحلقة"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {circle
              ? `${circle.mosque.name} · ${circle.activeStudentsCount} طالب نشط`
              : "جميع مهام حلقتك في مكان واحد"}
          </p>
        </header>

        <Link
          href={`/teacher/${circleId}/attendance`}
          className="group block rounded-2xl border border-primary-100 bg-primary-50 p-6 transition-colors hover:bg-primary-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white">
                <CalendarCheck size={22} />
              </span>
              <div className="min-w-0">
                <h2 className="text-lg font-bold text-primary-900">
                  سجل التفقد اليومي
                </h2>
                <p className="mt-0.5 text-sm text-primary-800">
                  اليوم {today} — سجّل حضور وغياب طلاب الحلقة
                </p>
              </div>
            </div>
            <span className="inline-flex items-center gap-2 rounded-xl bg-primary-700 px-4 py-2.5 text-sm font-semibold text-white">
              ابدأ التفقد
              <ChevronLeft size={16} />
            </span>
          </div>
        </Link>

        <nav aria-label="أقسام الحلقة" className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
          {recordSections.map((section, index) => (
            <Link
              key={section.href}
              href={section.href}
              className={`group flex items-center gap-4 px-5 py-4 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${
                index > 0 ? "border-t border-gray-100" : ""
              }`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500 transition-colors group-hover:bg-primary-50 group-hover:text-primary-700">
                <section.icon size={18} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-gray-900 transition-colors group-hover:text-primary-700">
                  {section.title}
                </p>
                <p className="mt-0.5 text-xs text-gray-500">{section.description}</p>
              </div>
              {section.meta && (
                <span className="shrink-0 text-xs font-medium text-gray-400">
                  {section.meta}
                </span>
              )}
              <ChevronLeft
                size={18}
                className="shrink-0 text-gray-300 transition-transform group-hover:-translate-x-0.5"
              />
            </Link>
          ))}
        </nav>
      </div>
    </DashboardPage>
  );
}
