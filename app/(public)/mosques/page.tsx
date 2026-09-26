import Link from "next/link";
import { ArrowRight, Mosque } from "lucide-react";
import MosqueCard from "@/components/home/Mosque/MosqueCard";
import { getMosques } from "@/lib/features/mosque/services/mosque.service";

export default async function MosquesPage() {
  let mosques: any[] = [];

  try {
    const response = await getMosques(1);
    mosques = response.data;
  } catch (error) {
    console.error("Error fetching mosques:", error);
  }

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-neutral-50 text-neutral-900"
    >
        {/* Page Header */}
        <section className="border-b border-neutral-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
            <Link
              href="/"
              className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-primary"
            >
              <ArrowRight className="h-4 w-4" />
              العودة إلى الرئيسية
            </Link>

            <span className="block text-sm font-semibold text-primary">
              مساجدنا
            </span>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              في رحاب المساجد
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
              تعرّف على المساجد 
            </p>
          </div>
        </section>

        {/* Mosques */}
        <section className="px-6 py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">
                  عدد المساجد
                </p>

                <p className="mt-1 text-2xl font-bold text-neutral-900">
                  {mosques.length}
                </p>
              </div>
            </div>

            {mosques.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {mosques.map((mosque) => (
                  <MosqueCard
                    key={mosque.id}
                    mosque={mosque}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-neutral-300 bg-white px-6 py-20 text-center">
                <h2 className="text-xl font-bold text-neutral-900">
                  لا توجد مساجد حاليًا
                </h2>

                <p className="mt-2 text-sm text-neutral-500">
                  سيتم عرض المساجد هنا عند توفرها.
                </p>
              </div>
            )}
          </div>
        </section>
    </div>
  );
}