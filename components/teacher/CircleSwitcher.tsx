"use client";

import { CircleTeacher } from "@/lib/features/circle/types";
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
      value={currentCircleId || ""}
      onChange={(e) => {
        router.push(`/teacher/${e.target.value}`);
      }}
    >
      {circles.map((circle) => (
        <option key={circle.id} value={circle.id}>
          {circle.name}
        </option>
      ))}
    </select>
  );
}