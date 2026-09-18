import apiClient from "@/lib/api/client";
import {
  AttendanceReportResponse,
  CircleSession,
  CircleSessionResponse,
  CreateAttendancePayload,
} from "../types";


export const getSessionByDate = async (
  circleId: string,
  date: string
): Promise<CircleSessionResponse | null> => {
  try {
    const response = await apiClient.get(`/attendance/circle/${circleId}?date=${date}`);
    if (response.data.data === null) {
      return null;
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching session by date:", error);
    throw error;
  }
};

export const getCircleSessions = async (
  circleId: string
): Promise<CircleSession[]> => {
  try {
    const response = await apiClient.get(`/attendance/circle/${circleId}/sessions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching circle sessions:", error);
    throw error;
  }
};


export const saveAttendance = async (
  data: CreateAttendancePayload
): Promise<{ message: string }> => {
  try {
    const response = await apiClient.post("/attendance", data);
    return response.data;
  } catch (error) {
    console.error("Error saving attendance:", error);
    throw error;
  }
};

  
export const getAttendanceReport = async (
  circleId: string,
  startDate: string,
  endDate: string
): Promise<AttendanceReportResponse> => {
  try {
    const response = await apiClient.get(
      `/attendance/circle/${circleId}/report?startDate=${startDate}&endDate=${endDate}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching attendance report:", error);
    throw error;
  }
};