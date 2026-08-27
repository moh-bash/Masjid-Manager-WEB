// src/components/dashboard/sidebar/SidebarLogoutButton.tsx

"use client";

import { LogOut } from "lucide-react";

interface SidebarLogoutButtonProps {
  onClick: () => void;
}

export default function SidebarLogoutButton({
  onClick,
}: SidebarLogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        h-15
        w-full
        items-center
        justify-between
        rounded-[28px]
        border-2
        border-[#C33752]
        bg-[#8B2E42]
        px-6
        text-lg
        font-bold
        text-white
        transition-all
        duration-300
        hover:bg-[#A8324C]
        hover:shadow-lg
        hover:shadow-red-950/20
      "
    >
      <span>تسجيل الخروج</span>

      <LogOut className="size-7" />
    </button>
  );
}