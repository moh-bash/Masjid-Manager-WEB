"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import CircleForm from "@/components/circle/CircleForm";
import { getCircleById } from "@/lib/features/circle/services/circle.service";
import { Circle } from "@/lib/features/circle/types";
import { Loader2 } from "lucide-react";

function EditCirclePage() {
  const params = useParams();
  const router = useRouter();
  const mosqueId = params.mosqueId as string;
  const circleId = params.circleId as string;

  const [initialData, setInitialData] = useState<Circle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCircle() {
      try {
        const data = await getCircleById(circleId);
        setInitialData(data);
      } catch (err: any) {
        setError("تعذر جلب بيانات الحلقة، قد تكون محذوفة أو لا تملك صلاحية الوصول.");
        setTimeout(() => {
          router.push(`/mosque/${mosqueId}/circles`);
        }, 2000);
      } finally {
        setIsLoading(false);
      }
    }

    if (circleId) {
      fetchCircle();
    }
  }, [circleId, mosqueId, router]);

  if (isLoading) {
    return (
      <DashboardPage>
        <div className="flex h-64 flex-col items-center justify-center gap-4 text-slate-500">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p>جاري تحميل بيانات الحلقة...</p>
        </div>
      </DashboardPage>
    );
  }

  if (error || !initialData) {
    return (
      <DashboardPage>
        <div className="flex h-64 items-center justify-center rounded-xl bg-red-50 text-red-500">
          {error}
        </div>
      </DashboardPage>
    );
  }

  return (
    <DashboardPage>
      <CircleForm mosqueId={mosqueId} initialData={initialData} />
    </DashboardPage>
  );
}

export default EditCirclePage;