import { LucideIcon } from "lucide-react";

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface SidebarRole {
  id: string;
  name: string;
  href: string;
}

export interface SidebarUser {
  name: string;
  image?: string;
}