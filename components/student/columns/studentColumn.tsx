import { Student, OrphanStatus } from "@/lib/features/student/types";
import { Eye, Edit, Trash2, ArrowRightLeft } from "lucide-react";
import Link from "next/link";

const translateOrphanStatus = (status: OrphanStatus) => {
    switch (status) {
        case OrphanStatus.FATHER:
            return "يتيم الأب";
        case OrphanStatus.MOTHER:
            return "يتيم الأم";
        case OrphanStatus.BOTH:
            return "يتيم الأبوين";
        case OrphanStatus.NONE:
        default:
            return "غير يتيم";
    }
};

export const getStudentColumns = (
    mosqueId: string,
    handleDelete: (id: string) => void
) => {
    return [
        {
            key: "name",
            header: "اسم الطالب",
            render: (row: Student) => (
                <span className="font-medium text-slate-800">{row.name}</span>
            ),
        },
        {
            key: "age",
            header: "العمر",
            render: (row: Student) => <span>{row.age} سنة</span>,
        },
        {
            key: "orphanStatus",
            header: "حالة اليتم",
            render: (row: Student) => {
                const isOrphan = row.orphanStatus !== OrphanStatus.NONE;
                return (
                    <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${isOrphan
                            ? "bg-amber-100 text-amber-700"
                            : "bg-slate-100 text-slate-600"
                            }`}
                    >
                        {translateOrphanStatus(row.orphanStatus)}
                    </span>
                );
            },
        },
        {
            key: "activeCircle",
            header: "الحلقة الحالية",
            render: (row: Student) => {
                return row.activeCircle ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                        {row.activeCircle.name}
                    </span>
                ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        غير مرتبط بحلقة
                    </span>
                );
            },
        },
        {
            key: "actions",
            header: "الإجراءات",
            render: (row: Student) => (
                <div className="flex items-center gap-2">
                    <Link
                        href={`/mosque/${mosqueId}/students/${row.id}`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-slate-600 transition hover:bg-gray-200"
                        title="عرض التفاصيل"
                    >
                        <Eye size={18} />
                    </Link>
                    <Link
                        href={`/mosque/${mosqueId}/students/${row.id}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-50 text-sky-600 transition hover:bg-sky-100"
                        title="تعديل"
                    >
                        <Edit size={18} />
                    </Link>
                    <Link
                        href={`/mosque/${mosqueId}/students/${row.id}/transfer`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600 transition hover:bg-amber-100"
                        title="نقل لحلقة أخرى"
                    >
                        <ArrowRightLeft size={18} />
                    </Link>
                    <button
                        onClick={() => handleDelete(row.id)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100"
                        title="حذف"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ),
        },
    ];
};