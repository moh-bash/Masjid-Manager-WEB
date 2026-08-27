import { ElementType, ReactNode } from "react";

export type TableColumn<T> = {
  key: string | "index" | "actions";
  header: string;
  className?: string;
  render?: (row: T, index: number) => ReactNode;
};

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
};

export type DataTableProps<T> = {
  data: T[];
  columns: TableColumn<T>[];
  getRowKey: (row: T, index: number) => string | number;
  emptyMessage?: string;
  Icon?: ElementType;
  classIcon?: string;
  pagination?: PaginationProps;
};
