import { TableColumn } from "@/components/UI/data-table/types";
import { Mosque } from "../types";
import { formatDateTime } from "@/lib/utils/format-date";
import { EllipsisVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export function getMosqueColumns(
  onDelete: (id: string) => void
): TableColumn<Mosque>[] {
  return [
    {
      key: "index",
      header: "#",
      className: "w-20 text-center",

      render: (_, index) => index + 1,
    },
    {
      key: "name",
      header: "اسم المسجد",
      className: "min-w-52",
    },
    {
      key: "manager",
      header: "مدير المسجد",

      render: (mosque) => mosque.manager?.name ?? "غير محدد",
    },
    {
      key: "createdAt",
      header: "تاريخ الإضافة",
      className: "text-center",

      render: (mosque) => formatDateTime(mosque.createdAt)
    },
    {
      key: "actions",
      header: "الإجراءات",
      className: "w-44",
      render: (mosque) => (
        <div className="flex items-center gap-3">
          <Link
            href={`/admin/mosques/${mosque.id}/details`}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-slate-600 transition hover:bg-gray-200"
          >
            <EllipsisVertical size={19} />
          </Link>

          <Link
            href={`/admin/mosques/${mosque.id}/edit`}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition hover:bg-sky-100"
          >
            <Pencil size={19} />
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
            onClick={() => onDelete(mosque.id)}
          >
            <Trash2 size={19} />
          </button>
        </div>
      ),
    },
  ];
}