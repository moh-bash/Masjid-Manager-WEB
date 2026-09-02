"use client";

import { useParams } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import StudentForm from "@/components/student/StudentForm";

export default function AddStudentPage() {
  const params = useParams();
  const mosqueId = params.mosqueId as string;

  return (
    <DashboardPage>
      <StudentForm mosqueId={mosqueId} />
    </DashboardPage>
  );
}