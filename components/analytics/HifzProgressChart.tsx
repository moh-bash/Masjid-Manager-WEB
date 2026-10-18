'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import type {
  HifzProgressData,
  HifzProgressDay,
} from '@/lib/features/analytics/types';

interface HifzProgressChartProps {
  data: HifzProgressData | null;
  periodLabel: string;
  isLoading?: boolean;
  error?: string | null;
}

interface HifzTooltipProps {
  active?: boolean;
  payload?: Array<{ payload?: HifzProgressDay }>;
}

function HifzTooltip({ active, payload }: HifzTooltipProps) {
  const entry = payload?.[0]?.payload;

  if (!active || !entry) {
    return null;
  }

  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-100">
      <p className="text-sm font-semibold text-slate-800">
        اليوم {entry.day}
      </p>
      <ul className="mt-1 space-y-0.5 text-xs text-slate-500">
        <li>
          التلاوات:{' '}
          <span className="font-semibold text-slate-700">
            {entry.recitations}
          </span>
        </li>
        <li>
          الآيات:{' '}
          <span className="font-semibold text-slate-700">{entry.ayahs}</span>
        </li>
        <li>
          الصفحات:{' '}
          <span className="font-semibold text-slate-700">{entry.pages}</span>
        </li>
      </ul>
    </div>
  );
}

const cardShell =
  'h-80 w-full p-4 bg-white border rounded-2xl shadow-sm border-slate-100 flex flex-col';

export function HifzProgressChart({
  data,
  periodLabel,
  isLoading = false,
  error = null,
}: HifzProgressChartProps) {
  if (isLoading) {
    return (
      <div className={cardShell} aria-busy="true">
        <div className="mb-4 h-6 w-40 animate-pulse rounded-lg bg-slate-100" />
        <div className="mb-4 h-5 w-56 animate-pulse rounded-lg bg-slate-100" />
        <div className="flex min-h-0 flex-1 items-end">
          <div className="h-2/3 w-full animate-pulse rounded-xl bg-slate-100" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cardShell}>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          تقدم الحفظ
        </h3>
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-red-200 bg-red-50 px-6 text-center">
          <p className="text-sm font-medium text-red-600">
            تعذر جلب بيانات تقدم الحفظ
          </p>
          <p className="mt-1 text-xs text-red-500/80">{error}</p>
        </div>
      </div>
    );
  }

  const hasData =
    !!data && (data.totalRecitations > 0 || data.totalAyahs > 0);

  if (!hasData || !data) {
    return (
      <div className={cardShell}>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          تقدم الحفظ
        </h3>
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
          <p className="text-sm font-medium text-slate-500">
            لا توجد بيانات حفظ مسجلة خلال {periodLabel}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            جرّب اختيار شهر آخر لعرض تقدم الحفظ
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cardShell}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-800">تقدم الحفظ</h3>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {data.totalRecitations} تلاوة · {data.totalPages} صفحة
        </span>
      </div>

      <div className="mb-2 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-600">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: '#3EA8D0' }}
          />
          الآيات المحفوظة خلال {periodLabel}
          <span className="font-semibold text-slate-800">
            {data.totalAyahs}
          </span>
        </span>
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data.byDay}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              interval={2}
              tick={{ fill: '#64748b', fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 12 }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ stroke: '#cbd5e1', strokeDasharray: '3 3' }}
              content={<HifzTooltip />}
            />
            <Line
              type="monotone"
              dataKey="ayahs"
              stroke="#3EA8D0"
              strokeWidth={2}
              dot={{ r: 3, fill: '#3EA8D0', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
