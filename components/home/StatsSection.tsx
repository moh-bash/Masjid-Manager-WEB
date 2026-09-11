import {
  Building2,
  GraduationCap,
  Users,
  UserRoundCheck,
} from "lucide-react";

const icons = [
  Building2,
  GraduationCap,
  Users,
  UserRoundCheck,
];

interface Stat {
  id: string;
  label: string;
  value: number;
}

interface StatsSectionProps {
  stats: Stat[];
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="relative z-10 -mt-8 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl border border-neutral-100 bg-white shadow-xl shadow-neutral-900/5 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = icons[index % icons.length];

            return (
              <div
                key={stat.id}
                className={`relative p-6 text-center sm:p-8 ${
                  index !== stats.length - 1
                    ? "border-b border-neutral-100 lg:border-b-0 lg:border-l"
                    : ""
                } ${
                  index === 1
                    ? "border-l border-neutral-100 lg:border-l"
                    : ""
                }`}
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <p className="mt-4 text-2xl font-bold text-neutral-900 sm:text-3xl">
                  {stat.value}
                </p>

                <p className="mt-1 text-sm text-neutral-500">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}