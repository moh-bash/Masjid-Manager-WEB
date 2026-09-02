import { Student, PaginatedStudentsResponse } from "../types";
import { CreateStudentData, UpdateStudentData, TransferStudentData } from "../schema/students.schema";
import apiClient from "@/lib/api/client";


export const getStudentsByMosque = async (
  mosqueId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedStudentsResponse> => {
  const response = await apiClient.get(`/students/mosque/${mosqueId}`, {
    params: { page, limit },
  });
  return response.data;
};

export const getStudentsByCircle = async (
  circleId: string,
  page: number = 1,
  limit: number = 10
): Promise<PaginatedStudentsResponse> => {
  try {
    const response = await apiClient.get(`/students/circle/${circleId}?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching students by circle:", error);
    throw error;
  }
};


export const getStudentById = async (studentId: string): Promise<Student> => {
  const response = await apiClient.get(`/students/${studentId}`);
  return response.data;
};


export const createStudent = async (
  mosqueId: string,
  data: CreateStudentData
): Promise<Student> => {
  const payload = { ...data, mosqueId };
  const response = await apiClient.post("/students", payload);
  return response.data;
};


export const updateStudent = async (
  studentId: string,
  data: UpdateStudentData
): Promise<{ message: string }> => {
  const response = await apiClient.patch(`/students/${studentId}`, data);
  return response.data;
};


export const transferStudent = async (
  studentId: string,
  data: TransferStudentData
): Promise<{ message: string }> => {
  const response = await apiClient.patch(`/students/${studentId}/transfer`, data);
  return response.data;
};


export const deleteStudent = async (studentId: string): Promise<{ message: string }> => {
  const response = await apiClient.delete(`/students/${studentId}`);
  return response.data;
};