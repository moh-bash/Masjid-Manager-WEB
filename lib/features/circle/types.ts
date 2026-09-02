export interface Circle {
  id: string;
  name: string;
  description?: string;
  level: number;
  maxStudents: number;
  teacher: {
    id: string;
    name: string;
    email: string;
    phoneNumber?: string;
  };
  mosque: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  activeStudentsCount: number;
  historicalStudentsCount: number;
}

export interface CircleTeacher {
  id: string;
  name: string;
  teacher:{
    id: string;
  }
}