"use client";

import { X } from "lucide-react";

import {
  SidebarNavItem,
  SidebarRole,
  SidebarUser,
} from "./types";

import SidebarProfile from "./SidebarProfile";
import SidebarNav from "./SidebarNav";
import SidebarLogoutButton from "./SidebarLogoutButton";

interface SidebarProps {
  user: SidebarUser;
  roles: SidebarRole[];
  activeRoleId: string;
  items: SidebarNavItem[];
  onRoleChange: (roleId: string) => void;
  onLogout: () => void;
  isMobileOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  user,
  roles,
  activeRoleId,
  items,
  onRoleChange,
  onLogout,
  isMobileOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {/* Overlay Mobile */}
      {isMobileOpen && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="
            fixed
            inset-0
            z-1499
            bg-black/50
            backdrop-blur-sm
            lg:hidden
          "
        ><button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="
            absolute
            left-3
            top-6
            flex
            size-10
            items-center
            justify-center
            rounded-full
            border-2
            border-white/80
            text-white
            transition
            hover:bg-white/10
            lg:hidden
          "
        >
          <X className="size-8" />
        </button></button>
      )}

      <aside
        className={` fixed inset-y-0 right-0 z-[1500] flex w-[320px] max-w-[85vw] flex-col bg-secondary-950 px-5 py-8 shadow-2xl transition-transform duration-300 ease-out lg:translate-x-0
          ${isMobileOpen
            ? "translate-x-0"
            : "translate-x-full"
          }
        `}
      >
        

        {/* User */}
        <SidebarProfile
          user={user}
          roles={roles}
          activeRoleId={activeRoleId}
          onRoleChange={onRoleChange}
        />

        {/* Menu */}
        <div className="mt-14 flex-1 overflow-y-auto">
          <SidebarNav
            items={items}
            onNavigate={onClose}
          />
        </div>

        {/* Logout */}
        <div className="mt-6">
          <SidebarLogoutButton
            onClick={onLogout}
          />
        </div>
      </aside>
    </>
  );
}