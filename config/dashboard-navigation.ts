import {
  Building2,
  ClipboardList,
  Home,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react";

import { SidebarNavItem } from "@/components/dashboard/sidebar/types";

export type UserRole =
  | "SYSTEM_ADMIN"
  | "MOSQUE_MANAGER"
  | "CIRCLE_TEACHER"
  | "PARENT";

export const dashboardNavigation: Record<UserRole, SidebarNavItem[]> = {
  SYSTEM_ADMIN: [
    { label: "لوحة التحكم", href: "/admin", icon: LayoutDashboard },
    { label: "المساجد", href: "/admin/mosques", icon: Building2 },
    { label: "المستخدمين", href: "/admin/users", icon: Users },
    { label: "التقارير", href: "/admin/reports", icon: ClipboardList },
    { label: "الإعدادات", href: "/admin/settings", icon: Settings },
  ],

  MOSQUE_MANAGER: [
    { label: "لوحة التحكم", href: "/mosque", icon: LayoutDashboard },
    { label: "الحلقات", href: "/mosque/circles", icon: ClipboardList },
    { label: "الطلاب", href: "/mosque/students", icon: Users },
    { label: "الإعدادات", href: "/mosque/settings", icon: Settings },
  ],

  CIRCLE_TEACHER: [
    { label: "لوحة التحكم", href: "/teacher", icon: LayoutDashboard },
    { label: "طلابي", href: "/teacher/students", icon: Users },
    { label: "التقارير", href: "/teacher/reports", icon: ClipboardList },
  ],

  PARENT: [
    { label: "الرئيسية", href: "/parent", icon: Home },
  ],
};