export enum PrayerName {
  FAJR = 'FAJR',
  DHUHR = 'DHUHR',
  ASR = 'ASR',
  MAGHRIB = 'MAGHRIB',
  ISHA = 'ISHA',
}

export enum PrayerStatus {
  MOSQUE = 'MOSQUE',
  PRESENT = 'PRESENT',
  QADA = 'QADA',
  MISSED = 'MISSED',
}

export interface PrayerLog {
  id: string;
  studentId: string;
  date: string;
  prayer: PrayerName;
  status: PrayerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface UpsertPrayerPayload {
  studentId: string;
  prayer: PrayerName;
  status: PrayerStatus;
}