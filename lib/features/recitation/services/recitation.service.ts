import apiClient from "@/lib/api/client";
import { CreateRecitationPayload, RecitationResponse } from "../types";

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