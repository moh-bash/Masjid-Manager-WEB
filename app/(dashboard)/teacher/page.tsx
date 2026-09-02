import Button from "@/components/UI/Button";
import { getTeacherCircles } from "@/lib/features/circle/services/circle.service"; // المسار الافتراضي
import { redirect } from "next/navigation";

export default async function TeacherDashboard() {
  let circles;

  try {
    circles = await getTeacherCircles();
  } catch (error) {
    console.error("Error fetching teacher circles:", error);

    // Error State
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
        حدث خطأ أثناء جلب الحلقات الخاصة بك.
        <br />
        <Button href="/" size="lg">
          الرئيسية
        </Button>
      </div>
    );
  }

  // Success State & Redirect
  if (circles && circles.length > 0) {
    redirect(`/teacher/${circles[0].id}`);
  }

  // Empty State
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      لست معيناً كمعلم في أي حلقة حتى الآن.
      <br />
      <Button href="/" size="lg">
        الرئيسية
      </Button>
    </div>
  );
}