import apiClient from "@/lib/api/client";
import { MosqueData } from "../schemas/mosque.schema"
import { Mosque, MosqueManager } from "../types";
import { dataProp } from "@/components/mosque/MosqueForm";
import { PaginatedResponse } from "@/lib/types";

export async function addMosque(data: MosqueData): Promise<Mosque> {
const response = await apiClient.post<Mosque>("/mosques", data);
return response.data;
}

export async function getMosques(page: number): Promise<PaginatedResponse<Mosque>> {
    const response = await apiClient.get<PaginatedResponse<Mosque> >(`/mosques?page=${page}&limit=8`);
    console.log("getMosques response:", response.data);
    return response.data;
}

export async function getMosqueById(id: string): Promise<Mosque> {
    const response = await apiClient.get<Mosque>(`/mosques/${id}`);
    return response.data;
}

export async function getMyMosques(): Promise<MosqueManager[]> {
    const response = await apiClient.get<MosqueManager[]>("/mosques/me");
    return response.data;
}

export async function updateMosque(id: string, data: dataProp): Promise<{ message: string }> {
    const response = await apiClient.patch(`/mosques/${id}`, data);
    return response.data;
}

export async function deleteMosque(id: string): Promise<{ message: string }> {
    const response = await apiClient.delete(`/mosques/${id}`);
    return response.data;
}