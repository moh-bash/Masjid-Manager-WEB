import DashboardPage from "@/components/dashboard/DashboardPage";
import Button from "@/components/UI/Button";
import { BookOpen } from "lucide-react";

export default async function CircleRecitationPage({
  params,
}: {
  params: Promise<{ circleId: string }>;
}) {
  const { circleId } = await params;

  return (
    <DashboardPage>
      <header>
        <div className="py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-800">التلاوة</h1>
            <p className="text-sm text-gray-500 mt-1">
              سجل تلاوات طلاب الحلقة اليومية
            </p>
          </div>
          <Button
            size="md"
            href={`/teacher/${circleId}/recitation/add`}
            className="bg-[#3eb1d3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#36a0c0] transition-colors"
            leftIcon={<BookOpen size={16} />}
          >
            إضافة تلاوة
          </Button>
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#3eb1d3]/10 flex items-center justify-center mb-4">
          <BookOpen size={28} className="text-[#3eb1d3]" />
        </div>
        <p className="text-gray-600 text-sm">
          من هنا يمكنك تسجيل تلاوة كل طالب من طلاب جلسة اليوم.
        </p>
      </div>
    </DashboardPage>
  );
}