"use client";

import { Loader2, LogOut } from "lucide-react";

interface SidebarLogoutButtonProps {
  onClick: () => void;
  isLoading?: boolean;
}

export default function SidebarLogoutButton({
  onClick,
  isLoading = false,
}: SidebarLogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      aria-busy={isLoading}
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
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-white/70
        focus-visible:ring-offset-2
        focus-visible:ring-offset-secondary-950
        disabled:cursor-not-allowed
        disabled:opacity-70
        disabled:hover:bg-[#8B2E42]
        disabled:hover:shadow-none
      "
    >
      <span>{isLoading ? "جاري تسجيل الخروج..." : "تسجيل الخروج"}</span>

      {isLoading ? (
        <Loader2 className="size-7 animate-spin" />
      ) : (
        <LogOut className="size-7" />
      )}
    </button>
  );
}
