"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Users,
  ShieldCheck,
} from "lucide-react";
import Button from "../UI/Button";

export default function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-slate-50">
      {/* background */}
      <div className="absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-300/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary-200/60 blur-3xl" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#064e3b 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto flex min-h-[calc(100vh-80px)] max-w-7xl items-center px-6 py-20 lg:px-8">
        <div className="grid w-full items-center gap-16 lg:grid-cols-2">
          <div className="relative z-10">
            {/* Badge */}
            <h1 className="max-w-3xl text-4xl font-bold leading-[1.3] text-secondary-900 sm:text-5xl lg:text-6xl">
              منصة الطالب
              <span className="relative mx-3 inline-block text-primary">
                الإلكترونية
                <span className="absolute -bottom-1 right-0 h-1 w-full rounded-full bg-primary-300" />
              </span>
              في التعلم المسجدي
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600">
              منصة لطلاب المساجد في بلدة جسرين
            </p>

            {/* buttons */}
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button
                href="/register"
                variant="primary"
                leftIcon={<Users className="h-5 w-5" />}
                rightIcon={<ArrowLeft className="h-5 w-5" />}
                size="lg"
              >
                إنشاء حساب جديد
              </Button>

              <Button
                href="/login"
                variant="outline"
                leftIcon={<ShieldCheck className="h-5 w-5" />}
                size="lg"
              >
                تسجيل الدخول
              </Button>
            </div>
          </div>

          {/* Todo List 🕜 */}
          <div className="relative mx-auto w-full max-w-xl">

          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 transition-all hover:-translate-y-1 hover:shadow-lg">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
      >
        {icon}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-1 font-semibold text-slate-900">
        {value}
      </p>
    </div>
  );
}