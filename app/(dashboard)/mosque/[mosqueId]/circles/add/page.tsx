"use client";

import { useParams } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import CircleForm from "@/components/circle/CircleForm";

function AddCirclePage() {
  const params = useParams();
  const mosqueId = params.mosqueId as string;

  return (
    <DashboardPage>
      <CircleForm mosqueId={mosqueId} />
    </DashboardPage>
  );
}

export default AddCirclePage;