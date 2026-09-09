export enum AttendanceStatus {
  PRESENT = 'PRESENT',
  ABSENT = 'ABSENT',
  LATE = 'LATE',
  EXCUSED = 'EXCUSED', 
}

export interface StudentAttendancePayload {
  studentId: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface CreateAttendancePayload {
  circleId: string;
  date: string; 
  notes?: string; 
  attendances: StudentAttendancePayload[];
}

export interface AttendanceRecord {
  studentId: string;
  studentName: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface CircleSessionResponse {
  id?: string;
  date?: string;
  notes?: string;
  attendances?: AttendanceRecord[];
  message?: string;
  data?: null;
}

export interface AttendanceReportResponse {
  circleName: string;
  dates: string[]; 
  students: {
    id: string;
    name: string;
    records: Record<string, AttendanceStatus>; 
  }[];
}