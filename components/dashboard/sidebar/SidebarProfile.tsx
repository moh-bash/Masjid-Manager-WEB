import Image from "next/image";

import { SidebarRole, SidebarUser } from "./types";

import SidebarRoleSwitcher from "./SidebarRoleSwitcher";

import imageUser from "@/public/images/user.jpg";
import { Role } from "@/lib/features/auth/types";

interface SidebarProfileProps {
  user: SidebarUser;
  roles: SidebarRole[];
  activeRoleId: Role;
  onRoleChange: (roleId: Role) => void;
}

export default function SidebarProfile({
  user,
  roles,
  activeRoleId,
  onRoleChange,
}: SidebarProfileProps) {
  return (
    <div className="flex justify-between items-center">
      <div className="relative size-19 overflow-hidden rounded-full border-4 border-white/10">
        {user.image ? (
          <Image
            src={imageUser}
            alt={user.name}
            fill
            className="object-cover"
            sizes="80px"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-[#4B9BBA] text-3xl font-bold text-white">
            {user.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="flex-1 items-center ml-4">
        {/* Name */}
        <h2 className="text-center text-xl font-bold text-white">
          {user.name}
        </h2>

        {/* Roles */}
        <div className="mt-2">
          <SidebarRoleSwitcher
            roles={roles}
            activeRoleId={activeRoleId}
            onRoleChange={onRoleChange}
          />
        </div>
      </div>
    </div>
  );
}