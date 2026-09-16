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