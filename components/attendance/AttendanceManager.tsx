"use client";

import { useState, useEffect } from "react";
import { getSessionByDate, saveAttendance } from "@/lib/features/attendance/services/attendance.service";
import Button from "@/components/UI/Button";
import { Student } from "@/lib/features/student/types";
import { AttendanceStatus, CreateAttendancePayload } from "@/lib/features/attendance/types";
import { useToast } from "@/context/toast";
import { useRouter } from "next/navigation";

interface Props {
  circleId: string;
  students: Student[];
}

export default function AttendanceManager({ circleId, students }: Props) {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  
  const [sessionNotes, setSessionNotes] = useState<string>("");
  const [attendanceData, setAttendanceData] = useState<Record<string, { status: AttendanceStatus; notes: string }>>({});
  
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { showToast } = useToast();

  const route = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      setIsLoading(true);
      try {
        const session = await getSessionByDate(circleId, selectedDate);
        const newAttendanceState: Record<string, { status: AttendanceStatus; notes: string }> = {};

        if (session && session.attendances) {
          setSessionNotes(session.notes || "");
          session.attendances.forEach((record) => {
            newAttendanceState[record.studentId] = {
              status: record.status,
              notes: record.notes || "",
            };
          });
        } else {
          setSessionNotes("");
          students.forEach((student) => {
            newAttendanceState[student.id] = {
              status: AttendanceStatus.PRESENT,
              notes: "",
            };
          });
        }

        students.forEach((student) => {
          if (!newAttendanceState[student.id]) {
            newAttendanceState[student.id] = {
              status: AttendanceStatus.PRESENT,
              notes: "",
            };
          }
        });

        setAttendanceData(newAttendanceState);
      } catch (error) {
        showToast({
          message: "حدث خطأ أثناء جلب بيانات الحضور",
          type: "danger",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [circleId, selectedDate, students]);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], status },
    }));
  };

  const handleNotesChange = (studentId: string, notes: string) => {
    setAttendanceData((prev) => ({
      ...prev,
      [studentId]: { ...prev[studentId], notes },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload: CreateAttendancePayload = {
      circleId,
      date: selectedDate,
      notes: sessionNotes,
      attendances: Object.entries(attendanceData).map(([studentId, data]) => ({
        studentId,
        status: data.status,
        notes: data.notes,
      })),
    };

    try {
      const res = await saveAttendance(payload);
      showToast({
        message: res.message || "تم حفظ سجل الحضور بنجاح",
        type: "success",
      });
      route.back();
    } catch (error) {
      showToast({
        message: "حدث خطأ أثناء حفظ سجل الحضور",
        type: "danger",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Date & Global Notes */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الجلسة</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            max={new Date().toISOString().split("T")[0]}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
        <div className="w-full md:w-2/3">
          <label className="block text-sm font-medium text-gray-700 mb-2">ملاحظات الجلسة (اختياري)</label>
          <textarea
            value={sessionNotes}
            onChange={(e) => setSessionNotes(e.target.value)}
            placeholder="مثال: تم إخراج الطلاب مبكراً بسبب صيانة المسجد..."
            rows={2}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
        </div>
      </div>

      {/* Attendance Form */}
      {isLoading ? (
        <div className="flex justify-center p-12 text-gray-500">جاري تحميل السجل...</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">اسم الطالب</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 min-w-[300px]">حالة الحضور</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600">ملاحظات الطالب (اختياري)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {students.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                      لا يوجد طلاب مسجلين في هذه الحلقة حالياً.
                    </td>
                  </tr>
                ) : (
                  students.map((student) => {
                    const currentData = attendanceData[student.id];
                    if (!currentData) return null;

                    return (
                      <tr key={student.id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer text-sm transition-colors ${currentData.status === AttendanceStatus.PRESENT ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100'}`}>
                              <input type="radio" name={`status-${student.id}`} value={AttendanceStatus.PRESENT} checked={currentData.status === AttendanceStatus.PRESENT} onChange={() => handleStatusChange(student.id, AttendanceStatus.PRESENT)} className="sr-only" />
                              حاضر
                            </label>
                            
                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer text-sm transition-colors ${currentData.status === AttendanceStatus.ABSENT ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100'}`}>
                              <input type="radio" name={`status-${student.id}`} value={AttendanceStatus.ABSENT} checked={currentData.status === AttendanceStatus.ABSENT} onChange={() => handleStatusChange(student.id, AttendanceStatus.ABSENT)} className="sr-only" />
                              غائب
                            </label>

                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer text-sm transition-colors ${currentData.status === AttendanceStatus.LATE ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' : 'bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100'}`}>
                              <input type="radio" name={`status-${student.id}`} value={AttendanceStatus.LATE} checked={currentData.status === AttendanceStatus.LATE} onChange={() => handleStatusChange(student.id, AttendanceStatus.LATE)} className="sr-only" />
                              متأخر
                            </label>

                            <label className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full cursor-pointer text-sm transition-colors ${currentData.status === AttendanceStatus.EXCUSED ? 'bg-gray-200 text-gray-700 border border-gray-300' : 'bg-gray-50 text-gray-600 border border-transparent hover:bg-gray-100'}`}>
                              <input type="radio" name={`status-${student.id}`} value={AttendanceStatus.EXCUSED} checked={currentData.status === AttendanceStatus.EXCUSED} onChange={() => handleStatusChange(student.id, AttendanceStatus.EXCUSED)} className="sr-only" />
                              مستأذن
                            </label>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            placeholder="سبب التأخير/الغياب..."
                            value={currentData.notes}
                            onChange={(e) => handleNotesChange(student.id, e.target.value)}
                            className="w-full text-sm border-gray-200 rounded text-gray-700 focus:ring-primary focus:border-primary"
                          />
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          
          {students.length > 0 && (
            <div className="bg-gray-50 p-4 border-t border-gray-100 flex justify-end">
              <Button type="submit" disabled={isSaving} size="lg">
                {isSaving ? "جاري الحفظ..." : "حفظ سجل الحضور"}
              </Button>
            </div>
          )}
        </form>
      )}
    </div>
  );
}