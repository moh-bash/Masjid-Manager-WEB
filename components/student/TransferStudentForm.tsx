"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightLeft, Loader2, AlertCircle } from "lucide-react";
import { transferStudent } from "@/lib/features/student/services/student.service";
import { Student } from "@/lib/features/student/types";
import { Circle } from "@/lib/features/circle/types";
import { useToast } from "@/context/toast";
import Button from "@/components/UI/Button";

interface TransferStudentFormProps {
  student: Student;
  mosqueId: string;
  availableCircles: Circle[];
}

export default function TransferStudentForm({
  student,
  mosqueId,
  availableCircles,
}: TransferStudentFormProps) {
  const router = useRouter();
  const { showToast } = useToast();

  const [selectedCircleId, setSelectedCircleId] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentCircleId = student.activeCircle?.id;

  // استبعاد الحلقة الحالية وتصفية الحلقات
  const filteredCircles = availableCircles.filter(
    (circle) => circle.id !== currentCircleId
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!selectedCircleId) {
      setErrorMessage("يرجى اختيار الحلقة الجديدة");
      return;
    }

    try {
      setIsLoading(true);

      const response = await transferStudent(student.id, {
        newCircleId: selectedCircleId,
      });

      showToast({
        message: response.message || "تم نقل الطالب إلى الحلقة الجديدة بنجاح",
        type: "success",
      });

      const returnUrl = `/mosque/${mosqueId}/students/${student.id}`;
      router.push(returnUrl);
      router.refresh();
    } catch (error: any) {
      console.error("Error transferring student:", error);
      setErrorMessage(
        error.response?.data?.message || "حدث خطأ أثناء نقل الطالب. يرجى المحاولة لاحقاً."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 mt-4"
    >
      <h2 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">
        اختيار الحلقة الجديدة
      </h2>

      {errorMessage && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <AlertCircle size={20} className="shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <label htmlFor="newCircleId" className="text-sm font-bold text-slate-700">
          الحلقة المستهدفة
        </label>
        {filteredCircles.length > 0 ? (
          <select
            id="newCircleId"
            name="newCircleId"
            value={selectedCircleId}
            onChange={(e) => setSelectedCircleId(e.target.value)}
            disabled={isLoading}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
          >
            <option value="" disabled>
              -- اختر حلقة من القائمة --
            </option>
            {filteredCircles.map((circle) => {
              const availableSeats  = circle.maxStudents - circle.activeStudentsCount;

              return (
                <option key={circle.id} value={circle.id}>
                  {circle.name} | (المستوى {circle.level}) | الأماكن الشاغرة: {availableSeats}
                </option>
              );
            })}
          </select>
        ) : (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            لا توجد حلقات أخرى متاحة في هذا المسجد حالياً للنقل إليها.
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
        <Button
          type="button"
          variant="outline"
          size="md"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          إلغاء
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading || !selectedCircleId || filteredCircles.length === 0}
        >
          {isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <span className="flex items-center gap-2">
              <ArrowRightLeft size={18} />
              تأكيد النقل
            </span>
          )}
        </Button>
      </div>
    </form>
  );
}