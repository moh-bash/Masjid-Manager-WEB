import Link from "next/link";
import {
  Home,
  ArrowRight,
  Search,
  MapPinOff,
} from "lucide-react";
import Button from "@/components/UI/Button";

export default function NotFound() {
  return (
    <main className="relative flex min-h-[calc(100vh-72px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-16">
      
      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary-100/60 blur-3xl" />

        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-primary-100/50 blur-3xl" />
      </div>

      <section className="relative z-10 mx-auto w-full max-w-2xl text-center">
        
        {/* Icon */}
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary-100 bg-white shadow-sm">
          <MapPinOff
            size={38}
            className="text-primary-600"
            strokeWidth={1.8}
          />
        </div>

        {/* 404 */}
        <div className="relative mb-2">
          <h1 className="select-none text-[120px] font-black leading-none tracking-tight text-primary-600 sm:text-[180px]">
            404
          </h1>

          <div className="absolute inset-0 -z-10 text-[120px] font-black leading-none tracking-tight text-primary-100/60 blur-sm sm:text-[180px]">
            404
          </div>
        </div>

        {/* Title */}
        <h2 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">
          عذرًا، لم نجد هذه الصفحة
        </h2>

        {/* Description */}
        <p className="mx-auto mb-8 max-w-md text-sm leading-7 text-slate-500 sm:text-base">
          يبدو أن الصفحة التي تبحث عنها غير موجودة، أو ربما تم نقلها
          إلى مكان آخر.
        </p>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          
          <Button
            href="/"
            variant="primary"
            size="lg"
          >
            <Home size={18} />

            العودة للرئيسية
          </Button>

          <Button
          href="/"
          variant="outline"
          size="lg"
          >
            <Search size={18} />
            البحث عن صفحة
          </Button>

        </div>

        {/* Small Footer Text */}
        <p className="mt-10 text-xs text-slate-400">
          خطأ 404 — الصفحة غير موجودة
        </p>

      </section>
    </main>
  );
}