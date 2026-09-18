export interface Sura {
  number: number;
  name: string;
  total_verses: number;
}

export interface CreateRecitationPayload {
  studentId: string;
  suraNumber: number;
  startAyah: number;
  endAyah: number;
  score: number;
  notes?: string;
}

export interface RecitationResponse {
  message: string;
}

export interface Recitation {
  id: string;
  suraNumber: number;
  startAyah: number;
  endAyah: number;
  score: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  student: {
    id: string;
    name: string;
  };
  session: {
    id: string;
    date: string;
    circle: {
      id: string;
      name?: string;
    };
  };
  teacher?: {
    id: string;
    name: string;
  } | null;
}

export interface GetRecitationsParams {
  page?: number;
  limit?: number;
  circleId?: string;
  studentId?: string;
  sessionId?: string;
  teacherId?: string;
  date?: string;
  suraNumber?: number;
}

export interface PaginatedRecitationsResponse {
  data: Recitation[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}