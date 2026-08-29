"use client";

import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

import { SidebarRole } from "./types";
import Link from "next/link";
import { Role } from "@/lib/features/auth/types";

interface SidebarRoleSwitcherProps {
  roles: SidebarRole[];
  activeRoleId: Role;
  onRoleChange: (roleId: Role) => void;
}

export default function SidebarRoleSwitcher({
  roles,
  activeRoleId,
  onRoleChange,
}: SidebarRoleSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeRole = roles.find(
    (role) => role.id === activeRoleId,
  );

  function handleRoleChange(roleId: Role) {
    onRoleChange(roleId);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-center gap-3 text-base font-medium text-slate-300 transition hover:text-white"
      >
        <span>
          {activeRole?.name}
        </span>

        <ChevronDown
          className={`
            size-6
            transition-transform
            duration-300
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-4 w-60 translate-x-0 overflow-hidden rounded-2xl bg-white shadow-2xl">
          {roles.map((role) => {
            const isActive =
              role.id === activeRoleId;

            return (
              <Link
                key={role.id}
                href={role.href}
                onClick={() =>
                  handleRoleChange(role.id)
                }
                className={`
                  flex
                  w-full
                  items-center
                  justify-between
                  px-5
                  py-3
                  text-right
                  text-base
                  transition

                  ${
                    isActive
                      ? "bg-[#4B9BBA] font-bold text-white"
                      : "text-slate-800 hover:bg-slate-100"
                  }
                `}
              >
                <span>{role.name}</span>

                {isActive && (
                  <Check className="size-5" />
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}