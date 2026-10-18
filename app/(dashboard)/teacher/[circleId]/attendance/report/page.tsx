import DashboardPage from "@/components/dashboard/DashboardPage";
import AttendanceReportManager from "@/components/attendance/AttendanceReportManager";
import Button from "@/components/UI/Button";

interface PageProps {
  params: Promise<{ circleId: string }>;
}

export default async function AttendanceReportPage({ params }: PageProps) {
  const resolvedParams = await params;
  const circleId = resolvedParams.circleId;

  return (
    <DashboardPage>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <header>
            <h1 className="text-2xl font-bold text-slate-900">تقرير الحضور والغياب</h1>
            <p className="mt-1 text-sm text-slate-500">
              متابعة سجل الحضور والغياب عبر جلسات الحلقة.
            </p>
          </header>

          <Button href={`/teacher/${circleId}/attendance`} variant="outline">
            تسجيل التفقد اليومي
          </Button>
        </div>

        <AttendanceReportManager circleId={circleId} />
      </div>
    </DashboardPage>
  );
}
