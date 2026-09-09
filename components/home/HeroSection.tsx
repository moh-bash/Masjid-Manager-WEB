import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

interface HeroSectionProps {
  data: {
    eyebrow: string;
    title: string;
    description: string;
    primaryButton: {
      label: string;
      href: string;
    };
    secondaryButton: {
      label: string;
      href: string;
    };
  };
}

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-neutral-50">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-primary-200/40 blur-3xl" />

        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary-100/70 blur-3xl" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(#205f7b 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">

          {/* Content */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-100 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
              <BookOpen className="h-4 w-4" />
              {data.eyebrow}
            </div>

            <h1 className="max-w-3xl text-4xl font-bold leading-[1.35] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
              {data.title}
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-neutral-600">
              {data.description}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={data.primaryButton.href}
                className="inline-flex items-center justify-center gap-3 rounded-xl bg-primary px-6 py-3.5 font-semibold text-white shadow-sm transition-all hover:bg-primary-600 hover:shadow-md"
              >
                {data.primaryButton.label}
                <ArrowLeft className="h-5 w-5" />
              </Link>

              <Link
                href={data.secondaryButton.href}
                className="inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-6 py-3.5 font-semibold text-neutral-700 transition-all hover:border-primary-200 hover:bg-primary-50 hover:text-primary"
              >
                {data.secondaryButton.label}
              </Link>
            </div>
          </div>

          {/* Visual */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/80 bg-white p-3 shadow-2xl shadow-neutral-900/10">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-primary-900">
                <div className="absolute inset-0 bg-gradient-to-t from-primary-950/80 via-primary-900/20 to-transparent" />

                <img
                  src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&w=1200&q=85"
                  alt="المسجد"
                  className="h-[460px] w-full object-cover"
                />

                <div className="absolute bottom-0 right-0 left-0 p-7 text-white">
                  <p className="text-sm text-primary-100">
                    في رحاب المسجد
                  </p>

                  <p className="mt-2 text-2xl font-bold">
                    قرآنٌ يُتلى، وعلمٌ يُتعلم
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-neutral-100 bg-white px-5 py-4 shadow-xl sm:block">
              <p className="text-xs text-neutral-500">
                حلقات القرآن والعلوم الشرعية
              </p>

              <p className="mt-1 font-bold text-neutral-900">
                معًا في رحاب المسجد
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}