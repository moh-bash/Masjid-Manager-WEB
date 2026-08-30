"use client";

import { FormEvent, useEffect, useState } from "react";
import FormUi from "../layout/FormUi";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { Loader2 } from "lucide-react";
import { addCircle, updateCircle } from "@/lib/features/circle/services/circle.service";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toast";
import { Circle } from "@/lib/features/circle/types";

interface CircleFormProps {
  mosqueId: string;
  initialData?: Circle; 
}

function CircleForm({ mosqueId, initialData }: CircleFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<number>(1);
  const [maxStudents, setMaxStudents] = useState<number>(20);
  const [teacherEmail, setTeacherEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();
  const router = useRouter();

  const mode = initialData ? "edit" : "create";
  const returnUrl = `/mosque/${mosqueId}/circles`;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || "");
      setLevel(initialData.level);
      setMaxStudents(initialData.maxStudents);
      setTeacherEmail(initialData.teacher?.email || "");
    }
  }, [initialData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) return setErrorMessage("يرجى إدخال اسم الحلقة");
    if (!teacherEmail.trim()) return setErrorMessage("يرجى إدخال البريد الإلكتروني لمعلم الحلقة");
    if (level < 1 || level > 5) return setErrorMessage("مستوى الحلقة يجب أن يكون بين 1 و 5");
    if (maxStudents < 1) return setErrorMessage("الحد الأقصى للطلاب يجب أن يكون طالباً واحداً على الأقل");

    try {
      setIsLoading(true);

      if (mode === "edit") {
        const updatePayload = {
          name,
          description,
          level,
          maxStudents,
          teacherEmail,
        };
        const response = await updateCircle(initialData!.id, updatePayload);
        showToast({ message: response.message, type: "success" });
      } else {
        const createPayload = {
          name,
          description,
          level,
          maxStudents,
          teacherEmail,
          mosqueId,
        };
        await addCircle(createPayload);
        showToast({ message: "تم إضافة الحلقة بنجاح", type: "success" });
      }

      router.push(returnUrl);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "حدث خطأ أثناء حفظ بيانات الحلقة"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-lg font-bold md:text-3xl">
          {mode === "create" ? "إضافة حلقة جديدة" : "تعديل بيانات الحلقة"}
        </h2>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" size="md" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : mode === "create" ? (
              "إضافة الحلقة"
            ) : (
              "تحديث البيانات"
            )}
          </Button>

          <Button type="button" variant="outline" size="md" href={returnUrl}>
            إلغاء
          </Button>
        </div>
      </div>

      <FormUi>
        {errorMessage && (
          <div className="col-span-2 mb-4 rounded-xl border border-red-600 bg-red-300/25 py-2 text-center text-red-500">
            {errorMessage}
          </div>
        )}

        <Input
          id="name"
          name="name"
          type="text"
          label="اسم الحلقة"
          placeholder="مثال: حلقة الإمام نافع"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          id="teacherEmail"
          name="teacherEmail"
          type="email"
          label="بريد المعلم الإلكتروني"
          placeholder="teacher@example.com"
          value={teacherEmail}
          onChange={(e) => setTeacherEmail(e.target.value)}
        />

        <Input
          id="level"
          name="level"
          type="number"
          label="مستوى الحلقة (1 إلى 5)"
          min={1}
          max={5}
          value={level}
          onChange={(e) => setLevel(Number(e.target.value))}
        />

        <Input
          id="maxStudents"
          name="maxStudents"
          type="number"
          label="الحد الأقصى للطلاب"
          min={1}
          value={maxStudents}
          onChange={(e) => setMaxStudents(Number(e.target.value))}
        />

        <div className="col-span-2">
          <label htmlFor="description" className="mb-2 block text-sm font-bold text-slate-700">
            وصف الحلقة (اختياري)
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="أدخل وصفاً أو ملاحظات عن هذه الحلقة..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </FormUi>
    </form>
  );
}

export default CircleForm;