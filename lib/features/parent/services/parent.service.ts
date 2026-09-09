import apiClient from "@/lib/api/client"; 
import { LinkStudentData } from "../schema/parent.schema";
import { LinkStudentResponse } from "../types";


export const linkStudentToParent = async (
  data: LinkStudentData
): Promise<LinkStudentResponse> => {
  try {
    const response = await apiClient.post("/student-link/connect", data);
    return response.data;
  } catch (error) {
    console.error("Error linking student:", error);
    throw error; 
  }
};

