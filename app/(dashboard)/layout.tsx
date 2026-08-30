import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";
import { ROLE_CONFIG } from "@/lib/features/auth/roles";
import { currentUser } from "@/lib/features/auth/services/auth.service";
import { User } from "@/lib/features/auth/types";

export const dynamic = "force-dynamic";

export default async function DashboardLayout({
  children, params
}: {
  children: React.ReactNode;
   params: {  };
}) {
  let userMe: User | null = null;

  try {
    userMe = await currentUser();
  } catch (error) {
    console.error("Error fetching current user:", error);
  }

  if (!userMe) {
    return null;
  }

  const user = {
    name: userMe.name || "John Doe",
    image: "/images/profile.jpg",
  };

  const userRoles = userMe.role.map((role) => ({
    id: role,
    ...ROLE_CONFIG[role],
  }));

  return (
    <DashboardLayoutClient
      user={user}
      roles={userRoles}
      initialRoleId={userRoles[0]?.id}
    >
      {children}
    </DashboardLayoutClient>
  );
}