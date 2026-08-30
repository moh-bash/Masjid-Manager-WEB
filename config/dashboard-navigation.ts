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
      : "undefined";

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
        id: 1,
        label: "لوحة التحكم",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        id: 2,
        label: "المساجد",
        href: "/admin/mosques",
        icon: Building2,
      },
      {
        id: 3,
        label: "المستخدمين",
        href: "/admin/users",
        icon: Users,
      },
      {
        id: 4,
        label: "التقارير",
        href: "/admin/reports",
        icon: ClipboardList,
      },
      {
        id: 5,
        label: "الإعدادات",
        href: "/admin/settings",
        icon: Settings,
      },
    ],

    MOSQUE_MANAGER: [
      {
        id: 6,
        label: "لوحة التحكم",
        href: mosqueId ? `/mosque/${mosqueId}` : "/mosque",
        icon: LayoutDashboard,
      },
      {
        id: 7,
        label: "الحلقات",
        href: mosqueId
          ? `/mosque/${mosqueId}/circles`
          : "/",
        icon: ClipboardList,
      },
      {
        id: 8,
        label: "الطلاب",
        href: mosqueId
          ? `/mosque/${mosqueId}/students`
          : "/",
        icon: Users,
      },
      {
        id: 9,
        label: "الإعدادات",
        href: mosqueId
          ? `/mosque/${mosqueId}/settings`
          : "/",
        icon: Settings,
      },
    ],

    CIRCLE_TEACHER: [
      {
        id: 10,
        label: "لوحة التحكم",
        href: circleId
          ? `/teacher/${circleId}`
          : "/",
        icon: LayoutDashboard,
      },
      {
        id: 11,
        label: "طلابي",
        href: circleId
          ? `/teacher/${circleId}/students`
          : "/",
        icon: Users,
      },
      {
        id: 12,
        label: "التقارير",
        href: circleId
          ? `/teacher/${circleId}/reports`
          : "/",
        icon: ClipboardList,
      },
    ],

    PARENT: [
      {
        id: 13,
        label: "الرئيسية",
        href: "/parent",
        icon: Home,
      },
    ],
  };
}