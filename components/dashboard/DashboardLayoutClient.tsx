"use client";

import { Menu, Mosque } from "lucide-react";
import { useState } from "react";

import Sidebar from "./sidebar/Sidebar";

import {
    SidebarNavItem,
  SidebarRole,
  SidebarUser,
} from "./sidebar/types";

import { dashboardNavigation, UserRole } from "@/config/dashboard-navigation";

interface DashboardLayoutClientProps {
  user: SidebarUser;
  roles: SidebarRole[];
  initialRoleId: string;
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  user,
  roles,
  initialRoleId,
  children,
}: DashboardLayoutClientProps) {
  const [activeRoleId, setActiveRoleId] = useState(initialRoleId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const items = dashboardNavigation[activeRoleId as UserRole] as SidebarNavItem[];

  function handleLogout() {
    console.log("Logout");
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        user={user}
        roles={roles}
        activeRoleId={activeRoleId}
        items={items}
        onRoleChange={setActiveRoleId}
        onLogout={handleLogout}
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="min-h-screen lg:mr-[320px]">
        {/* Header Mobile */}
        <header className="sticky top-0 right-0 left-0 flex w-full h-18 justify-between items-center px-5 rounded-b-3xl bg-gray-950 lg:hidden">
          <button
            type="button"
            aria-label="فتح القائمة"
            onClick={() => setIsSidebarOpen(true)}
            className="
              flex
              size-12
              items-center
              justify-center
              rounded-xl
              bg-[#232D3D]
              text-white
            "
          >
            <Menu className="size-7" />
          </button>

          <span className="text-white text-lg font-semibold">
            مسجدي
            <Mosque className="size-6 inline-block mr-2" />
          </span>
        </header>

        {children}
      </main>
    </div>
  );
}