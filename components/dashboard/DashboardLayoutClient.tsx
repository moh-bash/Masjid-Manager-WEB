"use client";

import { Menu, Mosque } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useState, useMemo, useCallback } from "react";
import Sidebar from "./sidebar/Sidebar";
import { SidebarRole, SidebarUser } from "./sidebar/types";
import { dashboardNavigation, UserRole } from "@/config/dashboard-navigation";
import { Role } from "@/lib/features/auth/types";

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
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // استنتاج الدور النشط من المسار
  const activeRoleId = useMemo(() => {
    const matched = roles.find((role) => pathname.startsWith(role.href));
    return matched?.id || initialRoleId;
  }, [pathname, roles, initialRoleId]);

  // جلب العناصر بدون تصفية صلاحيات
  const navigation = useMemo(() => dashboardNavigation(pathname), [pathname]);
  const items = navigation[activeRoleId] || [];

  // تغيير الدور مع التنقل الفعلي
  const handleRoleChange = useCallback(
    (roleId: Role) => {
      const role = roles.find((r) => r.id === roleId);
      if (role) {
        router.push(role.href);
        setIsSidebarOpen(false);
      }
    },
    [roles, router]
  );

  // تسجيل الخروج
  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        router.push("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [router]);

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
        <header className="sticky top-0 right-0 left-0 flex h-18 w-full items-center justify-between rounded-b-3xl bg-gray-950 px-5 lg:hidden">
          <button
            type="button"
            aria-label="فتح القائمة"
            onClick={() => setIsSidebarOpen(true)}
            className="flex size-12 items-center justify-center rounded-xl bg-[#232D3D] text-white"
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