import { apiClient } from "@/lib/api/client";
import { CircleAnalytics, MosqueAnalytics, SystemAnalytics } from "../types";

export async function getSystemAdmin(
  year?: number,
  month?: number,
): Promise<SystemAnalytics> {
  const response = await apiClient.get("/analytics/system-admin", {
    params: { year, month },
  });
  return response.data;
}

export async function getMosqueManager(
  mosqueId: string,
  year?: number,
  month?: number,
): Promise<MosqueAnalytics> {
  const response = await apiClient.get(`/analytics/mosques/${mosqueId}`, {
    params: { year, month },
  });
  return response.data;
}

//   getCircleTeacher: (circleId: string): Promise<CircleAnalytics> =>
//     apiClient.get(`/analytics/circles/${circleId}`),
// };
