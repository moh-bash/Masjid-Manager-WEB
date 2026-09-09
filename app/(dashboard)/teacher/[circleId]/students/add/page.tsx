"use client";

import { useParams } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import StudentForm from "@/components/student/StudentForm";
import { useEffect, useState } from "react";
import { getCircleById } from "@/lib/features/circle/services/circle.service";

export default function AddStudentPage() {
  const params = useParams();
  const circleId = params.circleId as string;
  const [mosqueId, setMosqueId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMosqueId = async () => {
      const circle = await getCircleById(circleId);
      if (circle) {
        setMosqueId(circle.mosque.id);
      }
    };
    fetchMosqueId();
  }, [circleId]);

  return (
    <DashboardPage>
      {mosqueId && <StudentForm mosqueId={mosqueId} circleIdProp={circleId} />}
      {!mosqueId && <p>Loading...</p>}
    </DashboardPage>
  );
}