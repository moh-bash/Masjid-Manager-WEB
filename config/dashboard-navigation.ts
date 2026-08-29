import {
  Building2,
  ClipboardList,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import { SidebarNavItem } from "@/components/dashboard/sidebar/types";
import { Role } from "@/lib/features/auth/types";

export type UserRole = Role;

export function dashboardNavigation(
  pathname: string
): Record<Role, SidebarNavItem[]> {
  const segments = pathname.split("/").filter(Boolean);

  const mosqueId =
    segments[0] === "mosque"
      ? segments[1]
      : undefined;

  const circleId =
    segments[0] === "teacher"
      ? segments[1]
      : undefined;

  const studentId =
    segments[0] === "parent"
      ? segments[1]
      : undefined;

  return {
    SYSTEM_ADMIN: [
      {
        label: "لوحة التحكم",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        label: "المساجد",
        href: "/admin/mosques",
        icon: Building2,
      },
      {
        label: "المستخدمين",
        href: "/admin/users",
        icon: Users,
      },
      {
        label: "التقارير",
        href: "/admin/reports",
        icon: ClipboardList,
      },
      {
        label: "الإعدادات",
        href: "/admin/settings",
        icon: Settings,
      },
    ],

    MOSQUE_MANAGER: [
      {
        label: "لوحة التحكم",
        href: mosqueId ? `/mosque/${mosqueId}` : "/mosque",
        icon: LayoutDashboard,
      },
      {
        label: "الحلقات",
        href: mosqueId
          ? `/mosque/${mosqueId}/circles`
          : "/mosque",
        icon: ClipboardList,
      },
      {
        label: "الطلاب",
        href: mosqueId
          ? `/mosque/${mosqueId}/students`
          : "/mosque",
        icon: Users,
      },
      {
        label: "الإعدادات",
        href: mosqueId
          ? `/mosque/${mosqueId}/settings`
          : "/mosque",
        icon: Settings,
      },
    ],

    CIRCLE_TEACHER: [
      {
        label: "لوحة التحكم",
        href: circleId
          ? `/teacher/${circleId}`
          : "/teacher",
        icon: LayoutDashboard,
      },
      {
        label: "طلابي",
        href: circleId
          ? `/teacher/${circleId}/students`
          : "/teacher",
        icon: Users,
      },
      {
        label: "التقارير",
        href: circleId
          ? `/teacher/${circleId}/reports`
          : "/teacher",
        icon: ClipboardList,
      },
    ],

    PARENT: [
      {
        label: "الرئيسية",
        href: studentId
          ? `/parent/${studentId}`
          : "/parent",
        icon: Home,
      },
    ],
  };
}