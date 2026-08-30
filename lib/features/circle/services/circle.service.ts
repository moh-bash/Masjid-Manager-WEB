import apiClient from "@/lib/api/client";
import { PaginatedResponse } from "@/lib/types";
import { Circle } from "../types";

export interface CreateCirclePayload {
  name: string;
  description?: string;
  level: number;
  maxStudents: number;
  teacherEmail: string;
  mosqueId: string;
}

export type UpdateCirclePayload = Partial<CreateCirclePayload>;

export async function getMosqueCircles(mosqueId: string, page: number): Promise<PaginatedResponse<Circle>> {
  const response = await apiClient.get<PaginatedResponse<Circle>>(`/circles/mosque/${mosqueId}?page=${page}&limit=10`);
  return response.data;
}

export async function addCircle(data: CreateCirclePayload): Promise<Circle> {
  const response = await apiClient.post<Circle>("/circles", data);
  return response.data;
}

export async function getCircleById(id: string): Promise<Circle> {
  const response = await apiClient.get<Circle>(`/circles/${id}`);
  return response.data;
}

export async function updateCircle(id: string, data: UpdateCirclePayload): Promise<{ message: string }> {
  const response = await apiClient.patch(`/circles/${id}`, data);
  return response.data;
}

export async function deleteCircle(id: string): Promise<{ message: string }> {
  const response = await apiClient.delete(`/circles/${id}`);
  return response.data;
}