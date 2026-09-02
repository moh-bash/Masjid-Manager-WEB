import { getTeacherCircles } from "@/lib/features/circle/services/circle.service";
import CircleSwitcher from "@/components/teacher/CircleSwitcher";

export default async function TeacherCircleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const circles = await getTeacherCircles();

  return (
    <div className="min-h-screen">
      <header>
        <CircleSwitcher circles={circles} />
      </header>
      <main>{children}</main>
    </div>
  );
}