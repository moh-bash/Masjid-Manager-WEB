import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  MapPin,
  Users,
} from "lucide-react";

interface MosqueCardProps {
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

export default function MosqueCard({
  mosque,
}: MosqueCardProps) {
  return (
    <article className="group overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-primary-100 hover:shadow-xl hover:shadow-neutral-900/5">
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={mosque.image}
          alt={mosque.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/60 via-transparent to-transparent" />

        <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          {mosque.location}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-neutral-900">
          {mosque.name}
        </h3>

        <p className="mt-3 min-h-[48px] text-sm leading-6 text-neutral-500">
          {mosque.description}
        </p>

        <div className="mt-5 flex items-center gap-5 border-t border-neutral-100 pt-5 text-sm text-neutral-500">
          <span className="flex items-center gap-1.5">
            <BookOpen className="h-4 w-4 text-primary" />
            {mosque.circlesCount} حلقات
          </span>

          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-secondary-600" />
            {mosque.studentsCount} طالب
          </span>
        </div>

        <Link
          href={`/mosques/${mosque.id}`}
          className="mt-6 flex items-center justify-between rounded-xl bg-neutral-50 px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-primary-50 hover:text-primary"
        >
          <span>عرض المسجد</span>

          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}