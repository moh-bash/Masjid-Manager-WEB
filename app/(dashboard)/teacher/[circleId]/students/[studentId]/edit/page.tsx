"use client";

import { useParams } from "next/navigation";
import DashboardPage from "@/components/dashboard/DashboardPage";
import StudentForm from "@/components/student/StudentForm";
import { useEffect, useState } from "react";
import { getCircleById } from "@/lib/features/circle/services/circle.service";
import { Student } from "@/lib/features/student/types";
import { getStudentById } from "@/lib/features/student/services/student.service";

export default function EditStudentPage() {
  const params = useParams();

  const circleId = params.circleId as string;
  const studentId = params.studentId as string;

  const [mosqueId, setMosqueId] = useState<string | null>(null);
  const [initialData, setInitialData] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!circleId || !studentId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const circle = await getCircleById(circleId);
        const student = await getStudentById(studentId);

        if (!circle) {
          throw new Error("تعذر العثور على الحلقة");
        }

        if (!student) {
          throw new Error("تعذر العثور على الطالب");
        }

        setMosqueId(circle.mosque.id);
        setInitialData(student);
      } catch (error) {
        console.error("Error loading student:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [circleId, studentId]);

  return (
    <DashboardPage>
      {isLoading && <p>Loading...</p>}

      {!isLoading && mosqueId && initialData && (
        <StudentForm
          mosqueId={mosqueId}
          circleIdProp={circleId}
          initialData={initialData}
        />
      )}

      {!isLoading && (!mosqueId || !initialData) && (
        <p>تعذر تحميل بيانات الطالب.</p>
      )}
    </DashboardPage>
  );
}