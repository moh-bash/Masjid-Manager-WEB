"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import { useToast } from "@/context/toast";
import { createRecitation } from "@/lib/features/recitation/services/recitation.service";
import { createRecitationSchema } from "@/lib/features/recitation/schema/recitations.schema";
import suras from "@/lib/data/suras.json";
import { Sura } from "@/lib/features/recitation/types";
import { CheckCircle2 } from "lucide-react";

interface Props {
  circleId: string;
  studentId: string;
  studentName: string;
}

const suraList = suras as unknown as Sura[];

interface FormValues {
  suraNumber: string;
  startAyah: string;
  endAyah: string;
  score: string;
  notes: string;
}

const emptyForm: FormValues = {
  suraNumber: "",
  startAyah: "",
  endAyah: "",
  score: "",
  notes: "",
};

export default function RecitationForm({ circleId, studentId, studentName }: Props) {
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState<boolean>(false);

  const { showToast } = useToast();
  const router = useRouter();

  const selectedSura = suraList.find(
    (s) => s.number === Number(values.suraNumber)
  );

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = createRecitationSchema.safeParse({
      studentId,
      suraNumber: Number(values.suraNumber),
      startAyah: Number(values.startAyah),
      endAyah: Number(values.endAyah),
      score: Number(values.score),
      notes: values.notes || undefined,
    });

    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const key = issue.path[0] as string;
        if (!errors[key]) errors[key] = issue.message;
      });
      setFieldErrors(errors);
      return;
    }

    setIsSaving(true);
    try {
      const res = await createRecitation(result.data);
      showToast({
        message: res.message || "تم حفظ التلاوة بنجاح",
        type: "success",
      });
      router.push(`/teacher/${circleId}/recitation/add`);
    } catch (error: unknown) {
      const message = (error as { response?: { data?: { message?: unknown } } })
        ?.response?.data?.message;
      const errorMessage = Array.isArray(message) ? message.join("، ") : message;
      showToast({
        message:
          typeof errorMessage === "string"
            ? errorMessage
            : "حدث خطأ أثناء حفظ التلاوة",
        type: "danger",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Selected student banner */}
      <div className="bg-gradient-to-l from-[#3eb1d3] to-[#58A5C7] text-white rounded-2xl shadow-sm p-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-white/80">اضافة تلاوة لـ</p>
          <h2 className="text-2xl font-bold mt-1">{studentName}</h2>
        </div>
        <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
          <CheckCircle2 size={28} />
        </div>
      </div>

      {/* Recitation form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              اسم السورة
            </label>
            <select
              value={values.suraNumber}
              onChange={(e) => handleChange("suraNumber", e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            >
              <option value="">اختر السورة...</option>
              {suraList.map((sura) => (
                <option key={sura.number} value={sura.number}>
                  {sura.number}. {sura.name} ({sura.total_verses} آية)
                </option>
              ))}
            </select>
            {selectedSura && (
              <p className="mt-1.5 text-xs text-gray-400">
                عدد آيات سورة {selectedSura.name}: {selectedSura.total_verses}
              </p>
            )}
            {fieldErrors.suraNumber && (
              <p className="mt-1.5 text-xs text-red-600">
                {fieldErrors.suraNumber}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              الدرجة (0 - 100)
            </label>
            <input
              type="number"
              min={0}
              max={100}
              placeholder="مثال: 85"
              value={values.score}
              onChange={(e) => handleChange("score", e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
            {fieldErrors.score && (
              <p className="mt-1.5 text-xs text-red-600">
                {fieldErrors.score}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              من الآية
            </label>
            <input
              type="number"
              min={1}
              placeholder="مثال: 1"
              value={values.startAyah}
              onChange={(e) => handleChange("startAyah", e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
            {fieldErrors.startAyah && (
              <p className="mt-1.5 text-xs text-red-600">
                {fieldErrors.startAyah}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              إلى الآية
            </label>
            <input
              type="number"
              min={1}
              placeholder="مثال: 10"
              value={values.endAyah}
              onChange={(e) => handleChange("endAyah", e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
            />
            {fieldErrors.endAyah && (
              <p className="mt-1.5 text-xs text-red-600">
                {fieldErrors.endAyah}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ملاحظات (اختياري)
          </label>
          <textarea
            rows={3}
            placeholder="مثال: تمت مراجعة المد مع أحكام التجويد..."
            value={values.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
          />
          {fieldErrors.notes && (
            <p className="mt-1.5 text-xs text-red-600">
              {fieldErrors.notes}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push(`/teacher/${circleId}/recitation/add`)}
            disabled={isSaving}
          >
            إلغاء
          </Button>
          <Button type="submit" disabled={isSaving} size="lg">
            {isSaving ? "جاري الحفظ..." : "حفظ التلاوة"}
          </Button>
        </div>
      </div>
    </form>
  );
}