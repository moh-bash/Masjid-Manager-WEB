"use client";

import { FormEvent, useEffect, useState } from "react";
import FormUi from "../layout/FormUi";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/context/toast";
import { Student, OrphanStatus } from "@/lib/features/student/types";
import { createStudent, updateStudent } from "@/lib/features/student/services/student.service";
import { getMosqueCircles } from "@/lib/features/circle/services/circle.service";
import { Circle } from "@/lib/features/circle/types";

interface StudentFormProps {
  mosqueId: string;
  initialData?: Student;
  circleIdProp?: string;
}

function StudentForm({ mosqueId, initialData, circleIdProp }: StudentFormProps) {
  const [name, setName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [motherName, setMotherName] = useState("");
  const [orphanStatus, setOrphanStatus] = useState<OrphanStatus>(OrphanStatus.NONE);
  const [registrationDate, setRegistrationDate] = useState("");
  const [circleId, setCircleId] = useState("");
  const [parentId, setParentId] = useState("");

  const [circles, setCircles] = useState<Circle[]>([]);
  const [isLoadingCircles, setIsLoadingCircles] = useState(true);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { showToast } = useToast();
  const router = useRouter();

  const mode = initialData ? "edit" : "create";
  const returnUrl = `/mosque/${mosqueId}/students`;

  useEffect(() => {
    async function fetchCircles() {
      try {
        setIsLoadingCircles(true);
        const response = await getMosqueCircles(mosqueId, 1);
        setCircles(response.data);
      } catch (error) {
        showToast({
          message: "تعذر جلب حلقات المسجد. يرجى المحاولة لاحقاً.",
          type: "danger",
        });
      } finally {
        setIsLoadingCircles(false);
      }
    }
    fetchCircles();
  }, [mosqueId, showToast]);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDateOfBirth(initialData.dateOfBirth.split("T")[0]);
      setMotherName(initialData.motherName);
      setOrphanStatus(initialData.orphanStatus);
      setRegistrationDate(initialData.registrationDate.split("T")[0]);
      setCircleId(initialData.activeCircle?.id || "");
    } else {
      setRegistrationDate(new Date().toISOString().split("T")[0]);
      if (circleIdProp) {
        setCircleId(circleIdProp);
      }
    }
  }, [initialData, circleIdProp]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) return setErrorMessage("يرجى إدخال اسم الطالب");
    if (!dateOfBirth) return setErrorMessage("يرجى إدخال تاريخ الميلاد");
    if (!motherName.trim()) return setErrorMessage("يرجى إدخال اسم الأم");
    if (!circleId) return setErrorMessage("يرجى اختيار الحلقة التي سينضم إليها الطالب");

    try {
      setIsLoading(true);

      const payload = {
        name,
        dateOfBirth,
        motherName,
        orphanStatus,
        registrationDate,
        circleId,
        parentId: parentId.trim() || undefined,
      };

      if (mode === "edit") {
        const response = await updateStudent(initialData!.id, payload);
        showToast({ message: response.message || "تم تحديث بيانات الطالب بنجاح", type: "success" });
      } else {
        await createStudent(mosqueId, payload);
        showToast({ message: "تم إضافة الطالب بنجاح", type: "success" });
      }

      router.push(returnUrl);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "حدث خطأ أثناء حفظ بيانات الطالب"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <h2 className="text-lg font-bold md:text-3xl">
          {mode === "create" ? "إضافة طالب جديد" : "تعديل بيانات الطالب"}
        </h2>
        <div className="flex gap-2">
          <Button type="submit" variant="primary" size="md" disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="animate-spin" />
            ) : mode === "create" ? (
              "إضافة الطالب"
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
          <div className="col-span-1 md:col-span-2 mb-4 rounded-xl border border-red-600 bg-red-300/25 py-2 text-center text-red-500">
            {errorMessage}
          </div>
        )}

        <Input
          id="name"
          name="name"
          type="text"
          label="اسم الطالب الرباعي"
          placeholder="مثال: أحمد محمد  "
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          id="motherName"
          name="motherName"
          type="text"
          label="اسم الأم"
          placeholder="أدخل اسم الأم"
          value={motherName}
          onChange={(e) => setMotherName(e.target.value)}
        />

        <Input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          label="تاريخ الميلاد"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />

        <div className="flex flex-col gap-2">
          <label htmlFor="orphanStatus" className="text-sm font-bold text-slate-700">
            حالة اليتم
          </label>
          <select
            id="orphanStatus"
            name="orphanStatus"
            value={orphanStatus}
            onChange={(e) => setOrphanStatus(e.target.value as OrphanStatus)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary"
          >
            <option value={OrphanStatus.NONE}>غير يتيم</option>
            <option value={OrphanStatus.FATHER}>يتيم الأب</option>
            <option value={OrphanStatus.MOTHER}>يتيم الأم</option>
            <option value={OrphanStatus.BOTH}>يتيم الأبوين</option>
          </select>
        </div>
        {!circleIdProp && (
          <div className="flex flex-col gap-2">
            <label htmlFor="circleId" className="text-sm font-bold text-slate-700">
              الحلقة
            </label>
            <select
              id="circleId"
              name="circleId"
              value={circleId}
              onChange={(e) => setCircleId(e.target.value)}
              disabled={isLoadingCircles}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 p-3 outline-none transition focus:border-primary focus:ring-1 focus:ring-primary disabled:opacity-50"
            >
              <option value="" disabled>
                {isLoadingCircles ? "جاري تحميل الحلقات..." : "اختر الحلقة"}
              </option>
              {circles.map((circle) => (
                <option key={circle.id} value={circle.id}>
                  {circle.name}
                </option>
              ))}
            </select>
          </div>
        )}

        <Input
          id="registrationDate"
          name="registrationDate"
          type="date"
          label="تاريخ التسجيل"
          value={registrationDate}
          onChange={(e) => setRegistrationDate(e.target.value)}
        />

        <Input
          id="parentId"
          name="parentId"
          type="text"
          label="معرف ولي الأمر (اختياري)"
          placeholder="أدخل UUID لولي الأمر إن وجد"
          value={parentId}
          onChange={(e) => setParentId(e.target.value)}
        />
      </FormUi>
    </form>
  );
}

export default StudentForm;