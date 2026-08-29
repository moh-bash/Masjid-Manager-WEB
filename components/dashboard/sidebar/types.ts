import { Role } from "@/lib/features/auth/types";
import { LucideIcon } from "lucide-react";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarRole {
  id: Role;
  name: string;
  href: string;
}

export interface SidebarUser {
  name: string;
  image?: string;
}