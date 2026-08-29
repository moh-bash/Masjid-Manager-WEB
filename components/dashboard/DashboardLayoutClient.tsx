"use client";

import { Menu, Mosque } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import Sidebar from "./sidebar/Sidebar";
import {
  SidebarRole,
  SidebarUser,
} from "./sidebar/types";

import {
  dashboardNavigation,
  UserRole,
} from "@/config/dashboard-navigation";

interface DashboardLayoutClientProps {
  user: SidebarUser;
  roles: SidebarRole[];
  initialRoleId: UserRole;
  children: React.ReactNode;
}

export default function DashboardLayoutClient({
  user,
  roles,
  initialRoleId,
  children,
}: DashboardLayoutClientProps) {
  const pathname = usePathname();
  const [activeRoleId, setActiveRoleId] = useState<UserRole>(initialRoleId);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigation = dashboardNavigation(pathname);
  const items = navigation[activeRoleId] || [];

  function handleLogout() {
    console.log("Logout");
  }

  function handleRoleChange(role: UserRole) {
    setActiveRoleId(role);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        user={user}
        roles={roles}
        activeRoleId={activeRoleId}
        items={items}
        onRoleChange={handleRoleChange}
        onLogout={handleLogout}
        isMobileOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <main className="min-h-screen lg:mr-[320px]">
        {/* Header Mobile */}
        <header className="sticky top-0 right-0 left-0 flex h-18 w-full items-center justify-between rounded-b-3xl bg-gray-950 px-5 lg:hidden">
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
          <span className="text-lg font-semibold text-white">
            مسجدي
            <Mosque className="mr-2 inline-block size-6" />
          </span>
        </header>
        {children}
      </main>
    </div>
  );
}