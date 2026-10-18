export interface SystemAnalytics {
  period: {
    year: number;
    month: number;
  };
  kpis: {
    totalMosques: number;
    totalCircles: number;
    totalStudents: number;
    totalManagers: number;
    totalTeachers: number;
  };
  charts: {
    hifzProgress: HifzProgressData;
  };
}

export interface AttendanceBreakdownItem {
  status: string;
  count: number;
  percentage: number;
}

export interface HifzProgressDay {
  date: string;
  day: number;
  recitations: number;
  ayahs: number;
  pages: number;
}

export interface HifzProgressData {
  totalRecitations: number;
  totalAyahs: number;
  totalPages: number;
  byDay: HifzProgressDay[];
}

export interface MosqueAnalytics {
  period: {
    year: number;
    month: number;
  };
  kpis: {
    totalCircles: number;
    totalStudents: number;
    totalTeachers: number;
  };
  charts: {
    attendance: {
      totalSessions: number;
      breakdown: AttendanceBreakdownItem[];
    };
    hifzProgress: HifzProgressData;
  };
}

export interface CircleAnalytics {
  kpis: {
    totalStudents: number;
    capacity: number;
  };
  charts: {
    attendance: { status: string; count: number }[];
  };
}
