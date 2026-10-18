"use client";

import { CircleTeacher } from "@/lib/features/circle/types";
import { SELECT_CLASSES } from "@/lib/features/analytics/constants";
import { useParams, useRouter } from "next/navigation";

interface CircleSwitcherProps {
  circles: CircleTeacher[];
}

export default function CircleSwitcher({
  circles,
}: CircleSwitcherProps) {
  const router = useRouter();
  const params = useParams();

  const currentCircleId = params.circleId as string;

  return (
    <select
      aria-label="اختر الحلقة"
      value={currentCircleId || ""}
      onChange={(e) => {
        router.push(`/teacher/${e.target.value}`);
      }}
      className={`${SELECT_CLASSES} max-w-[16rem] cursor-pointer truncate font-semibold`}
    >
      {circles.map((circle) => (
        <option key={circle.id} value={circle.id}>
          {circle.name}
        </option>
      ))}
    </select>
  );
}
