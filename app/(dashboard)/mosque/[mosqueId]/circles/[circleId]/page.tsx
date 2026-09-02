import {
  BookOpen,
  CalendarDays,
  Clock3,
  Edit,
  Mail,
  Phone,
  UserRound,
  Users,
  Info
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import DashboardPage from "@/components/dashboard/DashboardPage";
import { getCircleById } from "@/lib/features/circle/services/circle.service";
import { Circle } from "@/lib/features/circle/types";
import { StatCard } from "@/components/UI/statCard";
import { InfoItem } from "@/components/UI/infoItem";

export default async function CircleDetailsPage({
  params,
}: {
  params: { mosqueId: string; circleId: string };
}) {
  const { mosqueId, circleId } = await params;

  let circle: Circle;
  let availableSeats: number | null = null;

  try {
    circle = await getCircleById(circleId);
    availableSeats = circle.maxStudents - circle.activeStudentsCount;
  } catch (error) {
    console.error("Error fetching circle details:", error);
    notFound();
  }

  const createdAt = new Date(circle.createdAt).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedAt = new Date(circle.updatedAt).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <DashboardPage>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="text-primary" size={26} />
              تفاصيل الحلقة
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              عرض المعلومات الأساسية للحلقة والمعلم المسؤول عنها.
            </p>
          </div>
          <Link
            href={`/mosque/${mosqueId}/circles/${circle.id}/edit`}
            className="p-2 bg-primary-400/25 rounded-lg shadow-md hover:bg-primary-400 cursor-pointer"
          >
            <Edit/>
          </Link>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Info size={22} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">البيانات الأساسية للحلقة</h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <InfoItem
              icon={<BookOpen size={19} />}
              label="اسم الحلقة"
              value={circle.name}
            />
            <InfoItem
              icon={<span className="text-lg font-bold text-indigo-600 px-1">{circle.level}</span>}
              label="مستوى الحلقة"
              value={`المستوى ${circle.level}`}
            />
          </div>

          {circle.description && (
            <div className="mt-5 rounded-xl bg-slate-50 p-4 border border-slate-100">
              <h3 className="text-sm font-bold text-slate-700 mb-2">وصف الحلقة:</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {circle.description}
              </p>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Teacher Information */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <UserRound size={22} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">معلم الحلقة</h2>
                <p className="text-sm text-gray-500">
                  معلومات المعلم المسؤول عن هذه الحلقة
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <InfoItem
                icon={<UserRound size={19} />}
                label="الاسم"
                value={circle.teacher?.name ?? "غير محدد"}
              />
              <InfoItem
                icon={<Mail size={19} />}
                label="البريد الإلكتروني"
                value={circle.teacher?.email ?? "غير محدد"}
              />
              <InfoItem
                icon={<Phone size={19} />}
                label="رقم الهاتف"
                value={circle.teacher?.phoneNumber ?? "غير محدد"}
              />
            </div>
          </section>

          {/* Dates & Status Information */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Clock3 size={22} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">معلومات التسجيل</h2>
                <p className="text-sm text-gray-500">
                  تواريخ الإنشاء والتحديث
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <InfoItem
                icon={<CalendarDays size={19} />}
                label="تاريخ الإنشاء"
                value={createdAt}
              />
              <InfoItem
                icon={<Clock3 size={19} />}
                label="آخر تحديث"
                value={updatedAt}
              />
            </div>
          </section>
        </div>

        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Users size={22} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">إحصائيات الطلاب</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="الحد الأقصى للطلاب"
              value={circle.maxStudents.toString()}
              description="السعة القصوى للحلقة"
            />
            <StatCard
              title="عدد الطلاب الحالي"
              value={circle.activeStudentsCount.toString()}
              description="عدد الطلاب النشطين  في الحلقة "
            />
            <StatCard
              title="الأماكن الشاغرة"
              value={ availableSeats !== null ? availableSeats.toString() : "غير محدد" }
              description="سيتم حسابها تلقائياً لاحقاً"
            />
          </div>
        </section>
      </div>
    </DashboardPage>
  );
}