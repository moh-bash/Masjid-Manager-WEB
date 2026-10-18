'use client';

import { useRef, useState } from 'react';
import { HifzProgressChart } from '@/components/analytics/HifzProgressChart';
import {
  MONTH_NAMES,
  SELECT_CLASSES,
  YEAR_OPTIONS_COUNT,
} from '@/lib/features/analytics/constants';
import { getSystemAdmin } from '@/lib/features/analytics/services/analytcs.service';
import type { SystemAnalytics } from '@/lib/features/analytics/types';

interface SystemHifzSectionProps {
  initialData: SystemAnalytics;
}

export function SystemHifzSection({ initialData }: SystemHifzSectionProps) {
  const [data, setData] = useState<SystemAnalytics>(initialData);
  const [month, setMonth] = useState(initialData.period.month);
  const [year, setYear] = useState(initialData.period.year);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const requestIdRef = useRef(0);

  const now = new Date();
  const yearOptions = Array.from(
    { length: YEAR_OPTIONS_COUNT },
    (_, index) => now.getFullYear() - index,
  );
  const periodLabel = `${MONTH_NAMES[month - 1]} ${year}`;

  const handlePeriodChange = (nextMonth: number, nextYear: number) => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    setMonth(nextMonth);
    setYear(nextYear);
    setIsLoading(true);
    setError(null);

    getSystemAdmin(nextYear, nextMonth)
      .then((result) => {
        if (requestIdRef.current !== requestId) {
          return;
        }
        setData(result);
        setIsLoading(false);
      })
      .catch(() => {
        if (requestIdRef.current !== requestId) {
          return;
        }
        setError('تعذر جلب إحصائيات التلاوات للفترة المحددة.');
        setIsLoading(false);
      });
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            التلاوات وتقدم الحفظ عبر جميع المساجد
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            إجمالي التسميعات المسجلة ونقاط تقدم الحفظ خلال الشهر المحدد
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
              onChange={(event) =>
                handlePeriodChange(Number(event.target.value), year)
              }
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
              onChange={(event) =>
                handlePeriodChange(month, Number(event.target.value))
              }
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

      <HifzProgressChart
        data={data.charts.hifzProgress}
        periodLabel={periodLabel}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
