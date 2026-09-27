"use client";

import React, { useState, useEffect } from "react";
import { Clock, CheckCircle2, AlertCircle, XCircle, Home, Loader2 } from "lucide-react";
import { PrayerName, PrayerStatus } from "@/lib/features/prayer/types";
import { getTodayPrayers, upsertTodayPrayer } from "@/lib/features/prayer/services/prayer.service";

interface StudentPrayerTrackerProps {
  studentId: string;
}

const PRAYERS: { id: PrayerName; label: string }[] = [
  { id: PrayerName.FAJR, label: "الفجر" },
  { id: PrayerName.DHUHR, label: "الظهر" },
  { id: PrayerName.ASR, label: "العصر" },
  { id: PrayerName.MAGHRIB, label: "المغرب" },
  { id: PrayerName.ISHA, label: "العشاء" },
];

const STATUSES: { id: PrayerStatus; label: string; icon: React.ReactNode; activeColor: string }[] = [
  {
    id: PrayerStatus.MOSQUE,
    label: "حاضر في المسجد",
    icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" />,
    activeColor: "bg-emerald-500 border-emerald-600 text-white shadow-emerald-200",
  },
  {
    id: PrayerStatus.PRESENT,
    label: "حاضر",
    icon: <Home className="w-4 h-4 text-blue-600" />,
    activeColor: "bg-blue-500 border-blue-600 text-white shadow-blue-200",
  },
  {
    id: PrayerStatus.QADA,
    label: "قضاء",
    icon: <AlertCircle className="w-4 h-4 text-amber-600" />,
    activeColor: "bg-amber-500 border-amber-600 text-white shadow-amber-200",
  },
  {
    id: PrayerStatus.MISSED,
    label: "لم يصلي",
    icon: <XCircle className="w-4 h-4 text-rose-600" />,
    activeColor: "bg-rose-500 border-rose-600 text-white shadow-rose-200",
  },
];

export default function StudentPrayerTracker({ studentId }: StudentPrayerTrackerProps) {
  const [prayersMap, setPrayersMap] = useState<Record<string, PrayerStatus>>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [updatingPrayer, setUpdatingPrayer] = useState<string | null>(null);

  useEffect(() => {
    async function loadTodayData() {
      try {
        setLoading(true);
        const data = await getTodayPrayers(studentId);
        const map: Record<string, PrayerStatus> = {};
        data.forEach((log) => {
          map[log.prayer] = log.status;
        });
        setPrayersMap(map);
      } catch (error) {
        console.error("خطأ في جلب بيانات الصلوات اليومية:", error);
      } finally {
        setLoading(false);
      }
    }
    loadTodayData();
  }, [studentId]);

  const handleStatusChange = async (prayer: PrayerName, status: PrayerStatus) => {
    // التحديث الفوري المحلي (Optimistic Update)
    const previousStatus = prayersMap[prayer];
    setPrayersMap((prev) => ({ ...prev, [prayer]: status }));
    setUpdatingPrayer(prayer);

    try {
      await upsertTodayPrayer({
        studentId,
        prayer,
        status,
      });
    } catch (error) {
      console.error("فشل حفظ حالة الصلاة:", error);
      // التراجع في حال حدوث خطأ
      setPrayersMap((prev) => ({ ...prev, [prayer]: previousStatus }));
    } finally {
      setUpdatingPrayer(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white border border-gray-200 rounded-2xl shadow-sm">
        <Loader2 className="w-6 h-6 text-primary animate-spin" />
        <span className="mr-3 text-sm text-gray-600 font-medium">جاري تحميل جدول الصلوات...</span>
      </div>
    );
  }

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 mb-4">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
            <Clock size={22} />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">متابعة صلوات اليوم</h2>
            <p className="text-sm text-gray-500">
              سجل حالة الصلوات اليومية لليوم الحالي ({new Date().toLocaleDateString("ar-SA")})
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-right border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50/70">
              <th className="py-3 px-4 font-bold text-gray-700 text-sm">الصلاة</th>
              {STATUSES.map((statusItem) => (
                <th key={statusItem.id} className="py-3.5 px-4 text-sm font-medium text-gray-800">
                  <div className="flex items-center justify-center gap-2">
                    {statusItem.icon}
                    <span>{statusItem.label}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {PRAYERS.map((prayerItem) => (
              <tr key={prayerItem.id}>
                <th scope="row" className="py-3 px-4 font-bold text-gray-800 text-sm text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {prayerItem.label}
                    {updatingPrayer === prayerItem.id && <Loader2 className="w-3.5 h-3.5 text-primary animate-spin" />}
                  </div>
                </th>
                {STATUSES.map((statusItem) => {
                  const isSelected = prayersMap[prayerItem.id] === statusItem.id;

                  return (
                    <td key={`${prayerItem.id}-${statusItem.id}`} className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => handleStatusChange(prayerItem.id, statusItem.id)}
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full border-2 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/40 ${isSelected
                            ? `${statusItem.activeColor} scale-110 shadow-md`
                            : "border-gray-300 bg-white hover:border-gray-400 hover:scale-105"
                          }`}
                        title={`${statusItem.label} - ${prayerItem.label}`}
                        aria-label={`${statusItem.label} - ${prayerItem.label}`}
                      >
                        {isSelected && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}