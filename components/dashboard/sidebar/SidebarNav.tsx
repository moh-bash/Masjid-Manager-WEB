import { SidebarNavItem as SidebarNavItemType } from "./types";

import SidebarNavItem from "./SidebarNavItem";

interface SidebarNavProps {
  items: SidebarNavItemType[];
  onNavigate?: () => void;
}

export default function SidebarNav({
  items,
  onNavigate,
}: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-3">
      {items?.map((item) => (
        <SidebarNavItem
          key={`${item.label}-${item.href}`}
          item={item}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  );
}