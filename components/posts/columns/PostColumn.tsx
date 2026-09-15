import { TableColumn } from "@/components/UI/data-table/types";
import { formatDate } from "@/lib/utils/format-date";
import { ChevronLeft, Edit, Loader, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/features/post/types";

export default function getPostColumns(
    onDelete?: (id: string) => void,
    isDeleting?: boolean
): TableColumn<Post>[] {
    return [
        {
            key: "index",
            header: "#",
            className: "text-center",
            render: (_, index) => index + 1,
        },
        {
            key: "image",
            header: "الغلاف",
            className: " text-center",
            render: (post) => (
                <div className="relative h-10 w-16 overflow-hidden rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                    {post.image ? (
                        <Image src={post.image} alt={post.title} fill className="object-cover" />
                    ) : (
                        <span className="text-[10px] text-gray-400">لا صورة</span>
                    )}
                </div>
            ),
        },
        {
            key: "title",
            header: "العنوان",
            render: (post) => (
                <div>
                    <p className="font-medium text-slate-800 line-clamp-1">{post.title}</p>
                    <p className="text-xs text-slate-400 line-clamp-1" dir="ltr">{post.slug}</p>
                </div>
            ),
        },
        {
            key: "category",
            header: "التصنيف",
            render: (post) => (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                    {post.category?.name || "غير مصنف"}
                </span>
            ),
        },
        {
            key: "status",
            header: "الحالة",
            className: "text-center",
            render: (post) => (
                <span
                    className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${post.isPublished
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-yellow-50 text-yellow-700 border border-yellow-200"
                        }`}
                >
                    {post.isPublished ? "منشور" : "مسودة"}
                </span>
            ),
        },
        {
            key: "createdAt",
            header: "تاريخ الإضافة",
            className: "text-center",
            render: (post) => formatDate(post.createdAt),
        },
        {
            key: "actions",
            header: "الإجراءات",
            className: "w-24 text-center",
            render: (post) => (
                <div className="flex items-center justify-center gap-2">
                    <Link
                        href={`/posts/${post.slug}`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                        title="عرض "
                        target="_blank"
                    >
                        <ChevronLeft size={19} />
                    </Link>
                    <Link
                        href={`/admin/posts/${post.slug}/edit`}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary-100 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                        title="تعديل"
                    >
                        <Edit size={19} className="text-primary" />
                    </Link>

                    {onDelete && (
                        <button
                            onClick={() => onDelete(post.id)}
                            className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-500 transition hover:bg-red-100 hover:text-red-700"
                            title="حذف"
                        >
                            {isDeleting ? (
                                <Loader size={17} className="animate-spin" />
                            ) : (
                                <Trash2 size={17} />
                            )}
                        </button>
                    )}
                </div>
            ),
        },
    ];
}