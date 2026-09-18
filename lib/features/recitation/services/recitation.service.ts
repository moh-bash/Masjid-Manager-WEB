import apiClient from "@/lib/api/client";
import {
  CreateRecitationPayload,
  GetRecitationsParams,
  PaginatedRecitationsResponse,
  RecitationResponse,
} from "../types";

export const createRecitation = async (
  data: CreateRecitationPayload
): Promise<RecitationResponse> => {
  try {
    const response = await apiClient.post("/recitation", data);
    return response.data;
  } catch (error) {
    console.error("Error creating recitation:", error);
    throw error;
  }
};

export const getRecitations = async (
  params: GetRecitationsParams = {}
): Promise<PaginatedRecitationsResponse> => {
  try {
    const response = await apiClient.get<PaginatedRecitationsResponse>(
      "/recitation",
      { params }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching recitations:", error);
    throw error;
  }
};