"use client";

import { useState } from "react";
import { Key, Link as LinkIcon, AlertCircle, CheckCircle2, UserRound, Loader2 } from "lucide-react";
import { linkStudentSchema } from "@/lib/features/parent/schema/parent.schema";
import { linkStudentToParent } from "@/lib/features/parent/services/parent.service";
import { LinkStudentResponse } from "@/lib/features/parent/types";

export default function LinkStudentForm() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [successData, setSuccessData] = useState<LinkStudentResponse | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationResult = linkStudentSchema.safeParse({ code });
    if (!validationResult.success) {
      setError(validationResult.error.issues[0]?.message || "كود الربط غير صالح. يرجى التأكد من إدخاله بشكل صحيح.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await linkStudentToParent({ code });
      setSuccessData(response);
      setCode(""); 
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "حدث خطأ أثناء محاولة ربط الطالب. يرجى التأكد من الكود والمحاولة مرة أخرى.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 shadow-sm">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="mb-2 text-xl font-bold text-emerald-800">
            تم اضافة الطالب بنجاح!
          </h3>
          <p className="mb-6 text-sm text-emerald-600">
            {successData.message}
          </p>

          <div className="w-full max-w-sm rounded-xl border border-emerald-100 bg-white p-4 text-right shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
              <UserRound className="text-emerald-500" size={20} />
            </div>
            <div className="mt-3 space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">المسجد:</span></p>
              <p><span className="font-medium">الحلقة:</span></p>
            </div>
          </div>

          <button
            onClick={() => setSuccessData(null)}
            className="mt-6 rounded-lg bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-700"
          >
            ربط طالب آخر
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <LinkIcon size={24} />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">اضافة طالب جديد</h2>
          <p className="text-sm text-gray-500">أدخل كود الربط المكون من 6 رموز للحصول على بيانات الطالب</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="code" className="mb-1.5 block text-sm font-medium text-gray-700">
           كود اضافة الطالب (6 رموز)
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
              <Key size={18} />
            </div>
            <input
              type="text"
              id="code"
              name="code"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              disabled={isLoading}
              placeholder="مثال: A1B2C3"
              maxLength={6}
              className={`block w-full rounded-xl border bg-gray-50 py-3 pl-3 pr-10 text-left font-mono text-lg font-bold tracking-widest text-gray-900 transition-colors focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                error
                  ? "border-red-300 focus:border-red-500"
                  : "border-gray-200 focus:border-primary"
              }`}
              dir="ltr"
            />
          </div>
          {error && (
            <div className="mt-2 flex items-center gap-1.5 text-sm text-red-600">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading || code.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-white transition-all hover:bg-primary/90 focus:outline-none focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              <span>جاري التحقق والربط...</span>
            </>
          ) : (
            <>
              <LinkIcon size={18} />
              <span>ربط الطالب بالحساب</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}