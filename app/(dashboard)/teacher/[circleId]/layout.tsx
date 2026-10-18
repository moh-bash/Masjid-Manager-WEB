import { GraduationCap } from "lucide-react";
import { getTeacherCircles } from "@/lib/features/circle/services/circle.service";
import CircleSwitcher from "@/components/teacher/CircleSwitcher";

export default async function TeacherCircleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const circles = await getTeacherCircles();

  return (
    <div>
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-3 py-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
            <GraduationCap size={18} />
          </span>
          <CircleSwitcher circles={circles} />
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
