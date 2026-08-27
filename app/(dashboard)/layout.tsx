import DashboardLayoutClient from "@/components/dashboard/DashboardLayoutClient";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = {
    name: "محمد أحمد محمود",
    image: "/images/profile.jpg",
  };

  const roles = [
    {
      id: "SYSTEM_ADMIN",
      name: "مدير النظام",
      href: "/admin",
    },
    {
      id: "MOSQUE_MANAGER",
      name: "مدير المسجد",
      href: "/mosque",
    },
    {
      id: "CIRCLE_TEACHER",
      name: "مدرس الحلقة",
      href: "/teacher",
    },
    {
      id: "PARENT",
      name: "ولي الأمر",
      href: "/parent",
    },
  ];

  return (
    <DashboardLayoutClient
      user={user}
      roles={roles}
      initialRoleId="SYSTEM_ADMIN"
    >
      {children}
    </DashboardLayoutClient>
  );
}