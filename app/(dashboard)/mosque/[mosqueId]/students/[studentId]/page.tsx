import {
  CalendarDays,
  Clock3,
  Edit,
  UserRound,
  Info,
  BookOpen,
  History,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import DashboardPage from "@/components/dashboard/DashboardPage";
import { getStudentById } from "@/lib/features/student/services/student.service";
import { Student, OrphanStatus } from "@/lib/features/student/types";
import { InfoItem } from "@/components/UI/infoItem";
import { StatCard } from "@/components/UI/statCard";

const translateOrphanStatus = (status: OrphanStatus): string => {
  switch (status) {
    case OrphanStatus.FATHER:
      return "يتيم الأب";
    case OrphanStatus.MOTHER:
      return "يتيم الأم";
    case OrphanStatus.BOTH:
      return "يتيم الأبوين";
    case OrphanStatus.NONE:
    default:
      return "غير يتيم";
  }
};

export default async function StudentDetailsPage({
  params,
}: {
  params: { mosqueId: string; studentId: string };
}) {
  const { mosqueId, studentId } = await params;

  let student: Student;

  try {
    student = await getStudentById(studentId);
  } catch (error) {
    console.error("Error fetching student details:", error);
    notFound();
  }

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateOfBirth = new Date(student.dateOfBirth).toLocaleDateString("ar-SA", dateOptions);
  const registrationDate = new Date(student.registrationDate).toLocaleDateString("ar-SA", dateOptions);
  const createdAt = new Date(student.createdAt).toLocaleDateString("ar-SA", dateOptions);
  const updatedAt = new Date(student.updatedAt).toLocaleDateString("ar-SA", dateOptions);

  return (
    <DashboardPage>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <UserRound className="text-primary" size={26} />
              تفاصيل الطالب
            </h1>
          </div>
          <Link
            href={`/mosque/${mosqueId}/students/${student.id}/edit`}
            className="p-2 bg-primary-400/25 rounded-lg shadow-md hover:bg-primary-400 transition-colors cursor-pointer"
          >
            <Edit className="text-primary-700" size={20} />
          </Link>
        </div>

        {/* Basic Information */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Info size={22} />
            </div>
            <div>
              <h2 className="font-bold text-gray-900">البيانات الشخصية</h2>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={<UserRound size={19} />}
              label="اسم الطالب"
              value={student.name}
            />
            <InfoItem
              icon={<CalendarDays size={19} />}
              label="تاريخ الميلاد"
              value={dateOfBirth}
            />
            <InfoItem
              icon={<Clock3 size={19} />}
              label="العمر"
              value={`${student.age} سنة`}
            />
            <InfoItem
              icon={<UserRound size={19} />}
              label="اسم الأم"
              value={student.motherName}
            />
            <InfoItem
              icon={<Heart size={19} className={student.orphanStatus !== OrphanStatus.NONE ? "text-rose-500" : ""} />}
              label="الحالة الاجتماعية"
              value={translateOrphanStatus(student.orphanStatus)}
            />
          </div>
        </section>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Active Circle Information */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <BookOpen size={22} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">الحلقة الحالية</h2>
                <p className="text-sm text-gray-500">
                  تفاصيل الحلقة التي ينتمي إليها الطالب حالياً
                </p>
              </div>
            </div>

            {student.activeCircle ? (
              <div className="space-y-4">
                <InfoItem
                  icon={<BookOpen size={19} />}
                  label="اسم الحلقة"
                  value={student.activeCircle.name}
                />
                <InfoItem
                  icon={<CalendarDays size={19} />}
                  label="تاريخ الانضمام"
                  value={new Date(student.activeCircle.joinDate).toLocaleDateString("ar-SA", dateOptions)}
                />
                <div className="pt-2">
                  <Link 
                    href={`/mosque/${mosqueId}/circles/${student.activeCircle.id}`}
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 underline underline-offset-4"
                  >
                    عرض تفاصيل الحلقة
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center bg-gray-50 rounded-xl border border-gray-100">
                <BookOpen className="text-gray-400 mb-2" size={32} />
                <p className="text-gray-600 font-medium">الطالب غير مسجل في أي حلقة حالياً</p>
                <p className="text-sm text-gray-500 mt-1">يمكنك إضافته إلى حلقة من خلال تعديل البيانات</p>
              </div>
            )}
          </section>

          {/* Registration & System Dates */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <Clock3 size={22} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">معلومات التسجيل في النظام</h2>
                <p className="text-sm text-gray-500">
                  التواريخ المتعلقة بإضافة الطالب وتحديث بياناته
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <InfoItem
                icon={<CalendarDays size={19} />}
                label="تاريخ التسجيل المبدئي"
                value={registrationDate}
              />
              <InfoItem
                icon={<CalendarDays size={19} />}
                label="تاريخ الإضافة للنظام"
                value={createdAt}
              />
              <InfoItem
                icon={<Clock3 size={19} />}
                label="آخر تحديث للبيانات"
                value={updatedAt}
              />
            </div>
          </section>
        </div>

        {/* Past Circles - Render only if exists and has data */}
        {student.pastCircles && student.pastCircles.length > 0 && (
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <History size={22} />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">سجل الحلقات السابقة</h2>
                <p className="text-sm text-gray-500">
                  الحلقات التي انضم إليها الطالب مسبقاً وغادرها
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {student.pastCircles.map((pastCircle, index) => (
                <div key={`${pastCircle.circleId}-${index}`} className="border border-gray-100 rounded-xl p-4 bg-gray-50">
                  <h3 className="font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <BookOpen size={16} className="text-amber-500"/>
                    {pastCircle.circleName}
                  </h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><span className="font-medium">تاريخ الانضمام:</span> {new Date(pastCircle.joinDate).toLocaleDateString("ar-SA")}</p>
                    <p><span className="font-medium">تاريخ المغادرة:</span> {new Date(pastCircle.leaveDate).toLocaleDateString("ar-SA")}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </DashboardPage>
  );
}