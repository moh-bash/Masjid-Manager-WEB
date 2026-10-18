'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { StatCard } from '@/components/analytics/StatCard';
import { AttendanceChart } from '@/components/analytics/AttendanceChart';
import { HifzProgressChart } from '@/components/analytics/HifzProgressChart';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { getMosqueManager } from '@/lib/features/analytics/services/analytcs.service';
import {
  MONTH_NAMES,
  SELECT_CLASSES,
  YEAR_OPTIONS_COUNT,
} from '@/lib/features/analytics/constants';
import type { MosqueAnalytics } from '@/lib/features/analytics/types';
import DashboardPage from '@/components/dashboard/DashboardPage';

export default function MosqueAnalyticsPage() {
  const params = useParams<{ mosqueId: string }>();
  const mosqueId = params.mosqueId;

  const [year, setYear] = useState(() => new Date().getFullYear());
  const [month, setMonth] = useState(() => new Date().getMonth() + 1);
  const [data, setData] = useState<MosqueAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getMosqueManager(mosqueId, year, month)
      .then((result) => {
        if (!cancelled) {
          setData(result);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError('تعذر جلب إحصائيات المسجد للفترة المحددة.');
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [mosqueId, year, month]);

  const handleMonthChange = (value: number) => {
    setMonth(value);
    setIsLoading(true);
    setError(null);
  };

  const handleYearChange = (value: number) => {
    setYear(value);
    setIsLoading(true);
    setError(null);
  };

  if (error && !data) {
    return (
      <div className="p-6 text-red-600 bg-red-50 rounded-xl">
        <h2 className="font-semibold text-lg">
          عذراً، لا تملك صلاحية أو حدث خطأ
        </h2>
        <p className="text-sm">لا يمكنك الوصول لإحصائيات هذا المسجد.</p>
      </div>
    );
  }

  const now = new Date();
  const yearOptions = Array.from(
    { length: YEAR_OPTIONS_COUNT },
    (_, index) => now.getFullYear() - index,
  );
  const periodLabel = `${MONTH_NAMES[month - 1]} ${year}`;
  const kpis = data?.kpis;

  return (
    <DashboardPage>
      <div className="space-y-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              إحصائيات المسجد
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              عرض إحصائيات الحضور والتقدم وفق الشهر المحدد
            </p>
          </div>

          <div className="flex items-end gap-3">
            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500">
                الشهر
              </span>
              <select
                name="month"
                value={month}
                onChange={(event) => handleMonthChange(Number(event.target.value))}
                className={SELECT_CLASSES}
                aria-label="اختر الشهر"
              >
                {MONTH_NAMES.map((name, index) => (
                  <option key={name} value={index + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="text-xs font-medium text-slate-500">العام</span>
              <select
                name="year"
                value={year}
                onChange={(event) => handleYearChange(Number(event.target.value))}
                className={SELECT_CLASSES}
                aria-label="اختر العام"
              >
                {yearOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          <StatCard
            title="الحلقات النشطة"
            value={kpis ? kpis.totalCircles : isLoading ? '—' : 0}
            icon={BookOpen}
            colorClass="text-indigo-600 bg-indigo-50"
          />
          <StatCard
            title="الطلاب"
            value={kpis ? kpis.totalStudents : isLoading ? '—' : 0}
            icon={GraduationCap}
            colorClass="text-emerald-600 bg-emerald-50"
          />
          <StatCard
            title="المعلمين"
            value={kpis ? kpis.totalTeachers : isLoading ? '—' : 0}
            icon={Users}
            colorClass="text-blue-600 bg-blue-50"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AttendanceChart
            data={data?.charts.attendance.breakdown ?? []}
            totalSessions={data?.charts.attendance.totalSessions ?? 0}
            periodLabel={periodLabel}
            isLoading={isLoading}
            error={error}
          />

          <HifzProgressChart
            data={data?.charts.hifzProgress ?? null}
            periodLabel={periodLabel}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </DashboardPage>
  );
}
