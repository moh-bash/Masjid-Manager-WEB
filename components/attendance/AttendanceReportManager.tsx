"use client";

import { useState, useEffect } from "react";
import { getAttendanceReport } from "@/lib/features/attendance/services/attendance.service";
import Button from "@/components/UI/Button";
import { AttendanceReportResponse, AttendanceStatus } from "@/lib/features/attendance/types";
import { useToast } from "@/context/toast";

interface Props {
  circleId: string;
}

export default function AttendanceReportManager({ circleId }: Props) {
  const date = new Date();
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).toISOString().split('T')[0];
  const today = date.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(firstDay);
  const [endDate, setEndDate] = useState(today);
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState<AttendanceReportResponse | null>(null);

  const {showToast} = useToast();

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const data = await getAttendanceReport(circleId, startDate, endDate);
      setReportData(data);
    } catch (error) {
      showToast({
        message: "حدث خطأ أثناء جلب التقرير",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [circleId]); 

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (startDate > endDate) {
      showToast({
        message: "تاريخ البداية يجب أن يكون قبل تاريخ النهاية",
        type: "warning",
      });
      return;
    }
    fetchReport();
  };

  const renderStatus = (status?: AttendanceStatus) => {
    switch (status) {
      case AttendanceStatus.PRESENT:
        return <div className="w-4 h-4 rounded-full bg-green-500 mx-auto shadow-sm" title="حاضر"></div>;
      case AttendanceStatus.ABSENT:
        return <div className="w-4 h-4 rounded-full bg-red-500 mx-auto shadow-sm" title="غائب"></div>;
      case AttendanceStatus.LATE:
        return <div className="w-4 h-4 rounded-full bg-yellow-400 mx-auto shadow-sm" title="متأخر"></div>;
      case AttendanceStatus.EXCUSED:
        return <div className="w-4 h-4 rounded-full bg-gray-400 mx-auto shadow-sm" title="مستأذن"></div>;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-200 mx-auto" title="لم يسجل"></div>;
    }
  };

  const formatDate = (dateStr: string) => {
    const [, month, day] = dateStr.split('-');
    return `${day}/${month}`;
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-end justify-between gap-4">
        <form onSubmit={handleFilter} className="flex flex-col md:flex-row items-end gap-4 w-full md:w-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">من تاريخ</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">إلى تاريخ</label>
            <input
              type="date"
              value={endDate}
              max={today}
              onChange={(e) => setEndDate(e.target.value)}
              className="border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-sm"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} variant="primary">
            {isLoading ? "جاري التحديث..." : "تحديث التقرير"}
          </Button>
        </form>

        <div className="text-sm font-medium text-gray-500 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
          تاريخ اليوم: <span className="text-gray-900">{today}</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
        <span className="font-semibold text-gray-800 ml-2">دليل الحالات:</span>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-green-500"></div> حاضر</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500"></div> غائب</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> متأخر</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-gray-400"></div> مستأذن</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border-2 border-gray-200"></div> لم يسجل</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">جاري تحميل البيانات...</div>
        ) : !reportData || reportData.dates.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-2">
            <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>لا توجد سجلات تفقد في هذه الفترة الزمنية المحددة.</p>
          </div>
        ) : (
          <div className="overflow-x-auto max-w-full pb-4">
            <table className="w-full text-center border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr>
                  <th className="sticky right-0 bg-gray-50 px-4 py-4 text-right text-sm font-semibold text-gray-700 border-b border-l border-gray-200 z-10 w-48 shadow-[1px_0_5px_rgba(0,0,0,0.05)]">
                    اسم الطالب
                  </th>
                  {reportData.dates.map((date) => (
                    <th key={date} className="px-3 py-4 text-xs font-semibold text-gray-600 border-b border-gray-100 bg-gray-50/50">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-gray-400">{new Date(date).toLocaleDateString('ar-SA', { weekday: 'short' })}</span>
                        <span>{formatDate(date)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {reportData.students.map((student, index) => (
                  <tr key={student.id} className="hover:bg-blue-50/30 transition-colors">
                    {/* العمود الأول ثابت */}
                    <th className={`sticky right-0 px-4 py-3 text-right text-sm font-medium text-gray-800 border-l border-gray-100 z-10 shadow-[1px_0_5px_rgba(0,0,0,0.05)] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      {student.name}
                    </th>
                    {reportData.dates.map((date) => (
                      <td key={date} className="px-3 py-3 border-gray-50 border-x">
                        {renderStatus(student.records[date])}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}