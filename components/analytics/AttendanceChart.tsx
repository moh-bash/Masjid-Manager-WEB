'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import type { AttendanceBreakdownItem } from '@/lib/features/analytics/types';

interface AttendanceChartProps {
  data: AttendanceBreakdownItem[];
  totalSessions: number;
  periodLabel: string;
  isLoading?: boolean;
  error?: string | null;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  PRESENT: { label: 'حاضر', color: '#10b981' }, // Emerald
  ABSENT: { label: 'غائب', color: '#ef4444' }, // Red
  LATE: { label: 'متأخر', color: '#f59e0b' }, // Amber
  EXCUSED: { label: 'مُجاز', color: '#6366f1' }, // Indigo
};

interface AttendanceTooltipEntry {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface AttendanceTooltipProps {
  active?: boolean;
  payload?: Array<{ payload?: AttendanceTooltipEntry }>;
}

function AttendanceTooltip({ active, payload }: AttendanceTooltipProps) {
  const entry = payload?.[0]?.payload;

  if (!active || !entry) {
    return null;
  }

  return (
    <div className="rounded-xl bg-white px-4 py-3 shadow-lg ring-1 ring-slate-100">
      <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        {entry.name}
      </p>
      <p className="mt-1 text-xs text-slate-500">
        العدد:{' '}
        <span className="font-semibold text-slate-700">{entry.count}</span>
        {' · '}
        النسبة:{' '}
        <span className="font-semibold text-slate-700">
          {entry.percentage}%
        </span>
      </p>
    </div>
  );
}

const cardShell =
  'h-80 w-full p-4 bg-white border rounded-2xl shadow-sm border-slate-100 flex flex-col';

export function AttendanceChart({
  data,
  totalSessions,
  periodLabel,
  isLoading = false,
  error = null,
}: AttendanceChartProps) {
  if (isLoading) {
    return (
      <div className={cardShell} aria-busy="true">
        <div className="mb-4 h-6 w-44 animate-pulse rounded-lg bg-slate-100" />
        <div className="mb-4 h-5 w-64 animate-pulse rounded-lg bg-slate-100" />
        <div className="flex min-h-0 flex-1 items-end gap-4 pb-2">
          {[68, 42, 58, 34].map((height, index) => (
            <div
              key={index}
              className="flex-1 animate-pulse rounded-t-lg bg-slate-100"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cardShell}>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          إحصائيات الحضور
        </h3>
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-red-200 bg-red-50 px-6 text-center">
          <p className="text-sm font-medium text-red-600">
            تعذر جلب بيانات الحضور
          </p>
          <p className="mt-1 text-xs text-red-500/80">{error}</p>
        </div>
      </div>
    );
  }

  if (totalSessions === 0) {
    return (
      <div className={cardShell}>
        <h3 className="mb-4 text-lg font-semibold text-slate-800">
          إحصائيات الحضور
        </h3>
        <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50 px-6 text-center">
          <p className="text-sm font-medium text-slate-500">
            لا توجد جلسات مسجلة خلال {periodLabel}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            جرّب اختيار شهر آخر لعرض بيانات الحضور
          </p>
        </div>
      </div>
    );
  }

  const chartData = data.map((item) => ({
    name: statusConfig[item.status]?.label || item.status,
    count: Number(item.count),
    percentage: Number(item.percentage),
    color: statusConfig[item.status]?.color || '#94a3b8',
  }));

  return (
    <div className={cardShell}>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-800">
          إحصائيات الحضور
        </h3>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          {totalSessions} جلسة · {periodLabel}
        </span>
      </div>

      <div className="mb-3 flex flex-wrap gap-2">
        {chartData.map((entry) => (
          <span
            key={entry.name}
            className="inline-flex items-center gap-1.5 rounded-lg bg-slate-50 px-2 py-1 text-xs text-slate-600"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.name}
            <span className="font-semibold text-slate-800">{entry.count}</span>
            <span className="text-slate-400">({entry.percentage}%)</span>
          </span>
        ))}
      </div>

      <div className="min-h-0 flex-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 13 }}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              content={<AttendanceTooltip />}
            />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
