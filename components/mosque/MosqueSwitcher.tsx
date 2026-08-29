"use client";

import { useParams, useRouter } from "next/navigation";

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

  const currentMosqueId = params.id as string;

  return (
    <select
      value={currentMosqueId}
      onChange={(e) => {
        router.push(`/mosque/${e.target.value}`);
      }}
    >
      {mosques.map((mosque) => (
        <option key={mosque.id} value={mosque.id}>
          {mosque.name}
        </option>
      ))}
    </select>
  );
}