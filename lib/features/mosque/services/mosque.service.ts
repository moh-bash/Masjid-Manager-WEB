import apiClient from "@/lib/api/client";
import { MosqueData } from "../schemas/mosque.schema"
import { Mosque, PaginatedResponse } from "../types";

export async function addMosque(data: MosqueData): Promise<Mosque> {
const response = await apiClient.post<Mosque>("/mosques", data);
return response.data;
}

export async function getMosques(page: number): Promise<PaginatedResponse<Mosque>> {
    const response = await apiClient.get<PaginatedResponse<Mosque> >(`/mosques?page=${page}&limit=8`);
    return response.data;
}

export async function deleteMosque(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/mosques/${id}`);
    return response.data;
}