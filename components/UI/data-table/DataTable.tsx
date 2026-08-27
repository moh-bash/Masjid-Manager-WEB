import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  DataTableProps,
} from "./types";

export default function DataTable<T>({
  data,
  columns,
  getRowKey,
  emptyMessage,
  Icon,
  classIcon,
  pagination,
}: DataTableProps<T>) {
  const startItem = pagination
    ? (pagination.currentPage - 1) * pagination.pageSize + 1
    : 0;

  const endItem = pagination
    ? Math.min(
      pagination.currentPage * pagination.pageSize,
      pagination.totalItems
    )
    : 0;

  const getPageNumbers = () => {
    if (!pagination) return [];

    const { currentPage, totalPages } = pagination;

    const pages: number[] = [];

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      end = Math.min(5, totalPages);
    }

    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
    }

    for (let page = start; page <= end; page++) {
      pages.push(page);
    }

    return pages;
  };

  const handlePreviousPage = () => {
    if (pagination && pagination.currentPage > 1) {
      pagination.onPageChange(pagination.currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && pagination.currentPage < pagination.totalPages) {
      pagination.onPageChange(pagination.currentPage + 1);
    }
  };

  return (
    <div className="flex flex-1 flex-col gap-4 w-full justify-between">
      <div className="w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full overflow-x-auto border-collapse text-right">
            <thead>
              <tr className="bg-secondary-950 text-white">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`whitespace-nowrap px-6 py-5 text-sm font-bold ${column.className ?? ""
                      }`}
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {data.length > 0 ? (
                data.map((row, rowIndex) => (
                  <tr
                    key={getRowKey(row, rowIndex)}
                    className="border-b border-gray-100 transition-colors last:border-0 hover:bg-slate-50"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className={`whitespace-nowrap px-6 py-2 text-sm text-slate-600 ${column.className ?? ""
                          }`}
                      >
                        {column.render
                          ? column.render(row, rowIndex)
                          : String(
                            row[
                            column.key as keyof T
                            ] ?? ""
                          )}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16 text-center"
                  >
                    <div className="flex flex-col items-center justify-center gap-3 text-slate-400">
                      {Icon && <Icon
                        size={40}
                        strokeWidth={1.5}
                        className={`${classIcon ?? ""}`}
                      />}

                      <p className="text-sm font-medium">
                        {emptyMessage}
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && (
        <div className="flex flex-col-reverse items-center justify-between gap-4 w-full rounded-2xl border border-gray-200 bg-white px-6 py-2 shadow-sm sm:flex-row">
          <p className="text-sm text-slate-500">
            عرض{" "}
            <span className="font-semibold text-slate-700">
              {startItem}
            </span>{" "}
            إلى{" "}
            <span className="font-semibold text-slate-700">
              {endItem}
            </span>{" "}
            من{" "}
            <span className="font-semibold text-slate-700">
              {pagination.totalItems}
            </span>
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleNextPage}
              disabled={
                pagination.currentPage ===
                pagination.totalPages
              }
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="الصفحة التالية"
            >
              <ChevronRight size={20} />
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                type="button"
                onClick={() =>
                  pagination.onPageChange(page)
                }
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-sm font-semibold transition ${pagination.currentPage === page
                  ? "bg-primary text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={handlePreviousPage}
              disabled={
                pagination.currentPage === 1
              }
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="الصفحة السابقة"
            >
              <ChevronLeft size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}