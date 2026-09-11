"use client";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  MapPin,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface MosqueDetailsProps {
  mosque: {
    id: string;
    name: string;
    location: string;
    description: string;
    image: string;
    circlesCount: number;
    studentsCount: number;
  };
}

export default function MosqueDetails({
  mosque,
}: MosqueDetailsProps) {
    const router = useRouter();
  return (
    <>
      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8 lg:py-14">
          <button
            onClick={router.back}
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" />
            جميع المساجد
          </button>

          <div className="mt-8 overflow-hidden rounded-[2rem] bg-neutral-900">
            <div className="relative h-[420px] sm:h-[500px]">
              <img
                src={mosque.image}
                alt={mosque.name}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-transparent" />

              <div className="absolute right-6 bottom-6 left-6 sm:right-10 sm:bottom-10 sm:left-10">
                <div className="flex items-center gap-2 text-sm text-primary-100">
                  <MapPin className="h-4 w-4" />
                  {mosque.location}
                </div>

                <h1 className="mt-3 text-3xl font-bold text-white sm:text-5xl">
                  {mosque.name}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-neutral-50 px-6 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px]">

            {/* Description */}
            <div className="rounded-3xl border border-neutral-200 bg-white p-7 sm:p-9">
              <span className="text-sm font-semibold text-primary">
                عن المسجد
              </span>

              <h2 className="mt-3 text-2xl font-bold text-neutral-900">
                {mosque.name}
              </h2>

              <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600">
                {mosque.description}
              </p>

              <p className="mt-4 max-w-3xl text-base leading-8 text-neutral-600">
                يضم المسجد حلقات تعليمية تهتم بتحفيظ القرآن
                وتعليم العلوم الشرعية، بما ينسجم مع رسالة المسجد
                في نشر القرآن والعلم والتربية.
              </p>
            </div>

            {/* Statistics */}
            <div className="space-y-4">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                    <BookOpen className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-neutral-500">
                      الحلقات
                    </p>

                    <p className="mt-1 text-2xl font-bold text-neutral-900">
                      {mosque.circlesCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-50 text-secondary-700">
                    <Users className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-neutral-500">
                      الطلاب
                    </p>

                    <p className="mt-1 text-2xl font-bold text-neutral-900">
                      {mosque.studentsCount}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-50 text-accent-600">
                    <MapPin className="h-6 w-6" />
                  </div>

                  <div>
                    <p className="text-sm text-neutral-500">
                      الموقع
                    </p>

                    <p className="mt-1 font-bold text-neutral-900">
                      {mosque.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}