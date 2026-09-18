"use client";

import { usePathname, useRouter } from "next/navigation";
import { CalendarDays, FilterX, Users } from "lucide-react";

interface StudentOption {
  id: string;
  name: string;
}

interface SessionOption {
  id: string;
  date: string;
}

interface Props {
  circleId: string;
  students: StudentOption[];
  sessions: SessionOption[];
  activeStudentId?: string;
  activeSessionId?: string;
}

function formatSessionDate(date: string): string {
  const d = new Date(date);
  return Number.isNaN(d.getTime()) ? date : d.toLocaleDateString("ar");
}

export default function RecitationFilters({
  circleId,
  students,
  sessions,
  activeStudentId,
  activeSessionId,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const navigate = (studentId: string, sessionId: string) => {
    const params = new URLSearchParams();
    if (studentId) params.set("studentId", studentId);
    if (sessionId) params.set("sessionId", sessionId);
    router.push(`${pathname}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(`/teacher/${circleId}/recitation`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
      <div className="flex flex-col sm:flex-row gap-3 sm:items-end sm:justify-between">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
          <div>
            <label
              htmlFor="student-filter"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"
            >
              <Users size={14} className="text-[#3eb1d3]" />
              الطالب
            </label>
            <select
              id="student-filter"
              value={activeStudentId ?? ""}
              onChange={(e) => navigate(e.target.value, activeSessionId ?? "")}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#3eb1d3] focus:ring-1 focus:ring-[#3eb1d3] transition-all"
            >
              <option value="">كل الطلاب</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="session-filter"
              className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5"
            >
              <CalendarDays size={14} className="text-[#3eb1d3]" />
              الجلسة
            </label>
            <select
              id="session-filter"
              value={activeSessionId ?? ""}
              onChange={(e) => navigate(activeStudentId ?? "", e.target.value)}
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none focus:border-[#3eb1d3] focus:ring-1 focus:ring-[#3eb1d3] transition-all"
            >
              <option value="">كل الجلسات</option>
              {sessions.map((session) => (
                <option key={session.id} value={session.id}>
                  {formatSessionDate(session.date)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(activeStudentId || activeSessionId) && (
          <button
            type="button"
            onClick={clearFilters}
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