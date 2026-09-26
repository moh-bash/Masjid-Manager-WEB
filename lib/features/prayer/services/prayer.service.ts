import { apiClient } from '@/lib/api/client';
import { PrayerLog, UpsertPrayerPayload } from '../types';

export async function getTodayPrayers(studentId: string): Promise<PrayerLog[]> {
  const response = await apiClient.get<PrayerLog[]>(`/prayers/student/${studentId}/today`);
  return response.data;
}

export async function upsertTodayPrayer(payload: UpsertPrayerPayload): Promise<PrayerLog> {
  const response = await apiClient.post<PrayerLog>('/prayers/upsert', payload);
  return response.data;
}

export async function getStudentPrayerReport(
  studentId: string,
  startDate: string,
  endDate: string
): Promise<PrayerLog[]> {
  const response = await apiClient.get<PrayerLog[]>(
    `/prayers/student/${studentId}/report`,
    {
      params: { startDate, endDate },
    }
  );
  return response.data;
}