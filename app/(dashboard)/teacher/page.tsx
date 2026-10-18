import Button from "@/components/UI/Button";
import { getTeacherCircles } from "@/lib/features/circle/services/circle.service";
import { redirect } from "next/navigation";

export default async function TeacherDashboard() {
  let circles;

  try {
    circles = await getTeacherCircles();
  } catch (error) {
    console.error("Error fetching teacher circles:", error);

    // Error State
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-base font-semibold text-gray-900">
          حدث خطأ أثناء جلب الحلقات الخاصة بك.
        </p>
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
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-base font-semibold text-gray-900">
        لست معيناً كمعلم في أي حلقة حتى الآن.
      </p>
      <Button href="/" size="lg">
        الرئيسية
      </Button>
    </div>
  );
}
