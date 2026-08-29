import {
  CalendarDays,
  Clock3,
  Edit,
  Mail,
  MapPin,
  MosqueIcon,
  Phone,
  UserRound,
} from "lucide-react";

import DashboardPage from "@/components/dashboard/DashboardPage";
import LocationMap from "@/components/map/LocationMapWrapper";
import { getMosqueById } from "@/lib/features/mosque/services/mosque.service";
import { Mosque } from "@/lib/features/mosque/types";
import { notFound } from "next/navigation";
import { StatCard } from "@/components/UI/statCard";
import { InfoItem } from "@/components/UI/infoItem";
import Link from "next/link";

export default async function MosquePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  let mosque: Mosque;

  try {
    mosque = await getMosqueById(id);
  } catch (error) {
    console.error("Error fetching mosque details:", error);
    notFound();
  }

  const createdAt = new Date(mosque.createdAt).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const updatedAt = new Date(mosque.updatedAt).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <DashboardPage>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              تفاصيل المسجد
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              عرض المعلومات الأساسية للمسجد ومديره وموقعه.
            </p>
          </div>
          <Link
            href={`/admin/mosques/${id}/edit`}
            className="p-2 bg-primary-400/25 rounded-lg shadow-md hover:bg-primary-400 cursor-pointer"
          >
            <Edit/>
          </Link>
        </div>

        {/* Main Mosque Card */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {/* Cover */}
          <div className="relative h-48 bg-gradient-to-l from-primary to-primary-700 sm:h-56">
            {/* يمكن استبدال هذا الجزء بصورة المسجد مستقبلًا */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                  <span className="text-3xl">
                    <MosqueIcon />
                  </span>
                </div>

                <p className="text-sm text-white/80">
                  مسجد
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  {mosque.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Mosque Information */}
          <div className="p-5 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              {/* Name */}
              <InfoItem
                icon={<span className="text-lg">🕌</span>}
                label="اسم المسجد"
                value={mosque.name}
              />

              {/* Location */}
              <InfoItem
                icon={<MapPin size={20} />}
                label="المنطقة"
                value={"يتم تحديد المنطقة لاحقا"}
              />
            </div>
          </div>
        </section>

        {/* Manager + Dates */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Manager */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <UserRound size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  مدير المسجد
                </h2>

                <p className="text-sm text-gray-500">
                  معلومات المسؤول عن إدارة المسجد
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <InfoItem
                icon={<UserRound size={19} />}
                label="الاسم"
                value={mosque.manager?.name ?? "غير محدد"}
              />

              <InfoItem
                icon={<Mail size={19} />}
                label="البريد الإلكتروني"
                value={mosque.manager?.email ?? "غير محدد"}
              />

              <InfoItem
                icon={<Phone size={19} />}
                label="رقم الهاتف"
                value={mosque.manager?.phoneNumber ?? "غير محدد"}
              />

              <InfoItem
                icon={<CalendarDays size={19} />}
                label="تاريخ تسجيل المدير"
                value={
                  mosque.manager?.createdAt
                    ? new Date(
                      mosque.manager.createdAt
                    ).toLocaleDateString("ar-SA", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                    : "غير محدد"
                }
              />
            </div>
          </section>

          {/* Dates */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock3 size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  معلومات التسجيل
                </h2>

                <p className="text-sm text-gray-500">
                  تواريخ إنشاء وتحديث بيانات المسجد
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <InfoItem
                icon={<CalendarDays size={19} />}
                label="تاريخ إضافة المسجد"
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

        {/* Location */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <MapPin size={22} />
              </div>

              <div>
                <h2 className="font-bold text-gray-900">
                  موقع المسجد
                </h2>

                <p className="text-sm text-gray-500">
                  الموقع الجغرافي للمسجد على الخريطة
                </p>
              </div>
            </div>
          </div>

          <div className="">
            <LocationMap location={mosque.location} />
          </div>
        </section>

        {/* Future Information */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="font-bold text-gray-900">
            معلومات المسجد
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            معلومات إضافية سيتم توفيرها مستقبلًا.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <StatCard
              title="عدد الحلقات"
              value="--"
              description="سيتم تحديده لاحقًا"
            />

            <StatCard
              title="عدد الطلاب"
              value="--"
              description="سيتم تحديده لاحقًا"
            />

            <StatCard
              title="حالة المسجد"
              value="نشط"
              description="الحالة الحالية"
            />
          </div>
        </section>
      </div>
    </DashboardPage >
  );
}