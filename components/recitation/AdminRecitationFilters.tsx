"use client";

import { CalendarDays, FilterX, Network, UserRound } from "lucide-react";

interface CircleOption {
  id: string;
  name: string;
}

interface TeacherOption {
  id: string;
  name: string;
}

export interface AdminRecitationFiltersValue {
  circleId: string;
  teacherId: string;
  date: string;
}

interface Props {
  circles: CircleOption[];
  teachers: TeacherOption[];
  value: AdminRecitationFiltersValue;
  onChange: (value: AdminRecitationFiltersValue) => void;
}

export default function AdminRecitationFilters({
  circles,
  teachers,
  value,
  onChange,
}: Props) {
  const hasActiveFilter = value.circleId || value.teacherId || value.date;

  const clear = () => onChange({ circleId: "", teacherId: "", date: "" });

  const selectClassName =
    "w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#3eb1d3] focus:ring-1 focus:ring-[#3eb1d3] transition-all";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex flex-col lg:flex-row gap-3 lg:items-end lg:justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
          <div>
            <label
              htmlFor="admin-circle-filter"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"
            >
              <Network size={14} className="text-[#3eb1d3]" />
              الحلقة
            </label>
            <select
              id="admin-circle-filter"
              value={value.circleId}
              onChange={(e) =>
                onChange({ ...value, circleId: e.target.value })
              }
              className={selectClassName}
            >
              <option value="">كل الحلقات</option>
              {circles.map((circle) => (
                <option key={circle.id} value={circle.id}>
                  {circle.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="admin-teacher-filter"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"
            >
              <UserRound size={14} className="text-[#3eb1d3]" />
              المعلم
            </label>
            <select
              id="admin-teacher-filter"
              value={value.teacherId}
              onChange={(e) =>
                onChange({ ...value, teacherId: e.target.value })
              }
              className={selectClassName}
            >
              <option value="">كل المعلمين</option>
              {teachers.map((teacher) => (
                <option key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="admin-session-date-filter"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"
            >
              <CalendarDays size={14} className="text-[#3eb1d3]" />
              الجلسة (التاريخ)
            </label>
            <input
              id="admin-session-date-filter"
              type="date"
              value={value.date}
              onChange={(e) => onChange({ ...value, date: e.target.value })}
              className={selectClassName}
            />
          </div>
        </div>

        {hasActiveFilter && (
          <button
            type="button"
            onClick={clear}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg border border-gray-200 bg-white text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-colors shrink-0"
          >
            <FilterX size={14} />
            مسح الفلاتر
          </button>
        )}
      </div>
    </div>
  );
}