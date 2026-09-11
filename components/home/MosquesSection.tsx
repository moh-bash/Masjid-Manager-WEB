import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MosqueCard from "./MosqueCard";

interface Mosque {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  circlesCount: number;
  studentsCount: number;
}

interface MosquesSectionProps {
  mosques: Mosque[];
}

export default function MosquesSection({
  mosques,
}: MosquesSectionProps) {
  return (
    <section className="bg-white px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-sm font-semibold text-primary">
              مساجدنا
            </span>

            <h2 className="mt-2 text-3xl font-bold text-neutral-900 sm:text-4xl">
              في رحاب المساجد يبدأ الطريق
            </h2>

            <p className="mt-4 max-w-2xl leading-7 text-neutral-500">
              مساجد تحتضن حلقات القرآن وتعليم العلوم الشرعية، وتفتح أبوابها
              للعلم والذكر والتربية.
            </p>
          </div>

          <Link
            href="/mosques"
            className="inline-flex shrink-0 items-center gap-2 font-semibold text-primary transition-colors hover:text-primary-700"
          >
            عرض جميع المساجد
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mosques.map((mosque) => (
            <MosqueCard key={mosque.id} mosque={mosque} />
          ))}
        </div>
      </div>
    </section>
  );
}