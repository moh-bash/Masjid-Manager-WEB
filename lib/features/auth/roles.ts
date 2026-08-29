import { Role } from "./types";

export const ROLE_CONFIG: Record<
  Role,
  {
    name: string;
    href: string;
  }
> = {
  SYSTEM_ADMIN: {
    name: "مدير النظام",
    href: "/admin",
  },

  MOSQUE_MANAGER: {
    name: "مدير المسجد",
    href: "/mosque",
  },

  CIRCLE_TEACHER: {
    name: "مدرس الحلقة",
    href: "/teacher",
  },

  PARENT: {
    name: "ولي الأمر",
    href: "/parent",
  },
};