import { TableColumn } from "@/components/UI/data-table/types";
import { Circle } from "@/lib/features/circle/types";
import { formatDateTime } from "@/lib/utils/format-date";
import { ChevronLeft, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

export function getCircleColumns(
  mosqueId: string,
  onDelete: (id: string) => void
): TableColumn<Circle>[] {
  return [
    {
      key: "index",
      header: "#",
      className: "w-16 text-center",
      render: (_, index) => index + 1,
    },
    {
      key: "name",
      header: "اسم الحلقة",
      className: " font-semibold",
    },
    {
      key: "description",
      header: "الوصف",
      className: "max-w-44",
    },
    {
      key: "level",
      header: "المستوى",
      className: "text-center",
      render: (circle) => (
        <span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-xs font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
          المستوى {circle.level}
        </span>
      ),
    },
    {
      key: "teacher",
      header: "المعلم",
      render: (circle) => circle.teacher?.name ?? "غير محدد",
    },
    {
      key: "maxStudents",
      header: "الحد الأقصى",
      className: "text-center",
      render: (circle) => (
        <span className="text-slate-600">{circle.maxStudents} طالب</span>
      ),
    },
    {
      key: "actions",
      header: "الإجراءات",
      className: "w-44",
      render: (circle) => (
        <div className="flex items-center gap-2">
          <Link
            href={`/mosque/${mosqueId}/circles/${circle.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-slate-600 transition hover:bg-primary-50 hover:text-primary"
            title="عرض التفاصيل"
          >
            <ChevronLeft size={19} />
          </Link>

          <Link
            href={`/mosque/${mosqueId}/circles/${circle.id}/edit`}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition hover:bg-sky-100"
            title="تعديل الحلقة"
          >
            <Pencil size={19} />
          </Link>

          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
            onClick={() => onDelete(circle.id)}
            title="حذف الحلقة"
          >
            <Trash2 size={19} />
          </button>
        </div>
      ),
    },
  ];
}