export interface Mosque {
  id: string;
  name: string;
  manager?: {
    id: string;
    name: string;
  };

  location: {
    lat: number;
    lng: number;
  };

  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}