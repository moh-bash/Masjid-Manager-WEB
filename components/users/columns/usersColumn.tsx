
import { TableColumn } from "@/components/UI/data-table/types";
import { User } from "@/lib/features/auth/types";
import { formatDate } from "@/lib/utils/format-date";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

const roleLabels: Record<string, string> = {
  SYSTEM_ADMIN: "مدير النظام",
  MOSQUE_MANAGER: "مدير المسجد",
  CIRCLE_TEACHER: "معلم",
  PARENT: "ولي الأمر",
};

export default function getUserColumns(): TableColumn<User>[] {
  return [
    {
      key: "index",
      header: "#",
      className: "text-center",
      render: (_, index) => index + 1,
    },

    {
      key: "name",
      header: "اسم المستخدم",
    },

    {
      key: "email",
      header: "البريد الإلكتروني",
    },

    {
      key: "phoneNumber",
      header: "رقم الهاتف",
    },

    {
      key: "role",
      header: "الأدوار",
      render: (user) => (
        <div className="flex items-center gap-1">
          {user.role.map((role) => (
            <span
              key={role}
              className="items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary"
            >
              {roleLabels[role] ?? role}
            </span>
          ))}
        </div>
      ),
    },

    {
      key: "createdAt",
      header: "تاريخ الإضافة",
      className: "text-center",
      render: (user) => formatDate(user.createdAt),
    },

    {
      key: "actions",
      header: "الإجراءات",
      className: "",
      render: (user) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/admin/users/${user.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-slate-600 transition hover:bg-gray-200"
          >
            <ChevronLeft size={19} />
          </Link>
        </div>
      ),
    },
  ];
}