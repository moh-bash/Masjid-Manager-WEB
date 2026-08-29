"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SidebarNavItem as SidebarNavItemType } from "./types";

interface SidebarNavItemProps {
  item: SidebarNavItemType;
  onNavigate?: () => void;
}

export default function SidebarNavItem({
  item,
  onNavigate,
}: SidebarNavItemProps) {
  const pathname = usePathname();

  const Icon = item.icon;

  const isActive =
    pathname === item.href ||  pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={`
        group
        relative
        flex
        h-15
        items-center
        justify-between
        rounded-[28px]
        px-6
        text-lg
        font-bold
        transition-all
        duration-300

        ${
          isActive
            ? "bg-primary text-white shadow-lg shadow-[#4B9BBA]/20"
            : "text-slate-100 hover:bg-white/5"
        }
      `}
    >
      <span>{item.label}</span>

      <Icon
        className={`
          size-7
          transition-transform
          duration-300

          ${isActive ? "scale-110" : "group-hover:scale-110"}
        `}
        strokeWidth={2.3}
      />
    </Link>
  );
}