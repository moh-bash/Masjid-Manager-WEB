import AttendanceReportManager from "@/components/attendance/AttendanceReportManager";
import Button from "@/components/UI/Button";

interface PageProps {
  params: Promise<{ circleId: string }>;
}

export default async function AttendanceReportPage({ params }: PageProps) {
  const resolvedParams = await params;
  const circleId = resolvedParams.circleId;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900">تقرير الحضور والغياب</h1>
        
        <div className="flex items-center gap-3">
          <Button href={`/teacher/${circleId}/attendance`} variant="outline">
            تسجيل التفقد اليومي
          </Button>
        </div>
      </div>

      <AttendanceReportManager circleId={circleId} />
    </div>
  );
}