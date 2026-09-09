import Button from '@/components/UI/Button';

interface PageProps {
  params: Promise<{ circleId: string }>;
}

export default async function Page({ params }: PageProps) {
  const resolvedParams = await params;
  const circleId = resolvedParams.circleId;

  console.log('circleId:', circleId);

  return (
    <div>
      page: {circleId}

      <div className="flex items-center gap-3">
        <Button href={`/teacher/${circleId}/attendance`} variant="outline">
          سجل التفقد اليومي
        </Button>

        <Button href={`/teacher/${circleId}/attendance/report`} variant="outline">
          تقرير الحضور والغياب
        </Button>
      </div>
    </div>
  );
}