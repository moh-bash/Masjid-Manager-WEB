"use client";

import { Mosque } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { SELECT_CLASSES } from "@/lib/features/analytics/constants";

interface Mosque {
  id: string;
  name: string;
}

interface MosqueSwitcherProps {
  mosques: Mosque[];
}

export default function MosqueSwitcher({
  mosques,
}: MosqueSwitcherProps) {
  const router = useRouter();
  const params = useParams();

  const currentMosqueId = params.mosqueId as string;

  return (
    <select
      aria-label="اختر المسجد"
      value={currentMosqueId || ""}
      onChange={(e) => {
        router.push(`/mosque/${e.target.value}`);
      }}
      className={`${SELECT_CLASSES} max-w-[16rem] cursor-pointer truncate font-semibold`}
    >
      {mosques.map((mosque) => (
        <option key={mosque.id} value={mosque.id}>
          {mosque.name}
        </option>
      ))}
    </select>
  );
}
