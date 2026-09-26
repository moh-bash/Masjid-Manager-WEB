"use client";

import { useState, useEffect } from "react";
import { PrayerName, PrayerStatus } from "@/lib/features/prayer/types";
import Button from "@/components/UI/Button";
import { useToast } from "@/context/toast";
import { Clock } from "lucide-react";
import { getStudentPrayerReport } from "@/lib/features/prayer/services/prayer.service";

interface Props {
  studentId: string;
}

const PRAYERS = [
  { id: PrayerName.FAJR, label: "الفجر" },
  { id: PrayerName.DHUHR, label: "الظهر" },
  { id: PrayerName.ASR, label: "العصر" },
  { id: PrayerName.MAGHRIB, label: "المغرب" },
  { id: PrayerName.ISHA, label: "العشاء" },
];

export default function StudentPrayerReport({ studentId }: Props) {
  const date = new Date();
  const todayDateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  const firstDayString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-01`;

  const [startDate, setStartDate] = useState(firstDayString);
  const [endDate, setEndDate] = useState(todayDateString);
  const [isLoading, setIsLoading] = useState(true);
  const [reportData, setReportData] = useState<Record<string, Record<string, PrayerStatus>>>({});
  const [dateColumns, setDateColumns] = useState<string[]>([]);

  const { showToast } = useToast();

  const generateDatesRange = (start: string, end: string) => {
    const dates = [];
    let current = new Date(start);
    const last = new Date(end);
    
    while (current <= last) {
      const dateString = `${current.getFullYear()}-${String(current.getMonth() + 1).padStart(2, '0')}-${String(current.getDate()).padStart(2, '0')}`;
      dates.push(dateString);
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const fetchReport = async () => {
    setIsLoading(true);
    try {
      const dates = generateDatesRange(startDate, endDate);
      setDateColumns(dates);

      const data = await getStudentPrayerReport(studentId, startDate, endDate);
      
      const mappedData: Record<string, Record<string, PrayerStatus>> = {};
      data.forEach((log) => {
        if (!mappedData[log.date]) {
          mappedData[log.date] = {};
        }
        mappedData[log.date][log.prayer] = log.status;
      });

      setReportData(mappedData);
    } catch (error) {
      showToast({
        message: "حدث خطأ أثناء جلب تقرير الصلوات",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [studentId]);

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    if (new Date(startDate) > new Date(endDate)) {
      showToast({
        message: "تاريخ البداية يجب أن يكون قبل أو يساوي تاريخ النهاية",
        type: "warning",
      });
      return;
    }
    fetchReport();
  };

  const renderStatus = (status?: PrayerStatus) => {
    switch (status) {
      case PrayerStatus.MOSQUE:
        return <div className="w-4 h-4 rounded-full bg-emerald-500 mx-auto shadow-sm" title="في المسجد"></div>;
      case PrayerStatus.PRESENT:
        return <div className="w-4 h-4 rounded-full bg-blue-500 mx-auto shadow-sm" title="حاضر"></div>;
      case PrayerStatus.QADA:
        return <div className="w-4 h-4 rounded-full bg-amber-400 mx-auto shadow-sm" title="قضاء"></div>;
      case PrayerStatus.MISSED:
        return <div className="w-4 h-4 rounded-full bg-rose-500 mx-auto shadow-sm" title="لم يصلي"></div>;
      default:
        return <div className="w-4 h-4 rounded-full border-2 border-gray-200 mx-auto" title="لم يسجل"></div>;
    }
  };

  const formatDateLabel = (dateStr: string) => {
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
              max={todayDateString}
              onChange={(e) => setEndDate(e.target.value)}
              className="border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary text-sm"
              required
            />
          </div>
          <Button type="submit" disabled={isLoading} variant="primary">
            {isLoading ? "جاري التحديث..." : "تحديث التقرير"}
          </Button>
        </form>

        <div className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
          <Clock size={16} className="text-primary" />
          <span>سجل الصلوات الشهري</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100">
        <span className="font-semibold text-gray-800 ml-2">دليل الحالات:</span>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> بالمسجد</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-blue-500"></div> حاضر</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-amber-400"></div> قضاء</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-rose-500"></div> لم يصلي</div>
        <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full border-2 border-gray-200"></div> لم يسجل</div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
        {isLoading ? (
          <div className="p-12 text-center text-gray-500">جاري تحميل البيانات...</div>
        ) : (
          <div className="overflow-x-auto max-w-full pb-4">
            <table className="w-full text-center border-collapse whitespace-nowrap min-w-max">
              <thead>
                <tr>
                  <th className="sticky right-0 bg-gray-50 px-4 py-4 text-right text-sm font-semibold text-gray-700 border-b border-l border-gray-200 z-10 w-32 shadow-[1px_0_5px_rgba(0,0,0,0.05)]">
                    الصلاة
                  </th>
                  {dateColumns.map((dateStr) => (
                    <th key={dateStr} className="px-3 py-4 text-xs font-semibold text-gray-600 border-b border-gray-100 bg-gray-50/50">
                      <div className="flex flex-col items-center">
                        <span className="text-[10px] text-gray-400">{new Date(dateStr).toLocaleDateString('ar-SA', { weekday: 'short' })}</span>
                        <span>{formatDateLabel(dateStr)}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {PRAYERS.map((prayer, index) => (
                  <tr key={prayer.id} className="hover:bg-primary-50/30 transition-colors">
                    <th className={`sticky right-0 px-4 py-3 text-right text-sm font-medium text-gray-800 border-l border-gray-100 z-10 shadow-[1px_0_5px_rgba(0,0,0,0.05)] ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}>
                      {prayer.label}
                    </th>
                    {dateColumns.map((dateStr) => {
                      const status = reportData[dateStr]?.[prayer.id];
                      return (
                        <td key={`${prayer.id}-${dateStr}`} className="px-3 py-3 border-gray-50 border-x">
                          {renderStatus(status)}
                        </td>
                      );
                    })}
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