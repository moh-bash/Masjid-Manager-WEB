export enum OrphanStatus {
  NONE = 'NONE',
  FATHER = 'FATHER',
  MOTHER = 'MOTHER',
  BOTH = 'BOTH',
}

export interface ActiveCircle {
  id: string;
  name: string;
  joinDate: string;
}

export interface PastCircle {
  circleId: string;
  circleName: string;
  joinDate: string;
  leaveDate: string;
}

export interface Student {
  id: string;
  name: string;
  dateOfBirth: string;
  motherName: string;
  orphanStatus: OrphanStatus;
  registrationDate: string;
  age: number;
  activeCircle: ActiveCircle | null;
  pastCircles?: PastCircle[]; 
  
  parent?: {
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
  } | null;
  
  linkCode?: string | null; 

  createdAt: string;
  updatedAt: string;
}

export interface PaginatedStudentsResponse {
  data: Student[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}


export interface LinkedChild {
  id: string;
  name: string;
  mosqueName: string;
  circleName: string;
  teacherName: string;
}