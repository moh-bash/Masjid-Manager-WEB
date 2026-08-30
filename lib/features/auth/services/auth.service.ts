"use server";
import apiClient from "@/lib/api/client";

import type {
  RegisterData,
  LoginData,
} from "../schemas/auth.schema";

import type {
  LoginResponse,
  User,
} from "../types";
import { PaginatedResponse } from "@/lib/types";
import { cookies } from "next/headers";


export async function register( data: RegisterData): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>( "/auth/register",data );
  const cookieStore = await cookies();
  cookieStore.set({
      name: 'token',
      value: response.data.token,
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax',  
      path: '/', 
      maxAge: 60 * 60 * 24 * 7  
    });
  return response.data;
}

export async function login( data: LoginData ): Promise<LoginResponse> {
  try{
  const response = await apiClient.post<LoginResponse>( "/auth/login",data );
  const cookieStore = await cookies();
  cookieStore.set({
      name: 'token',
      value: response.data.token,
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
      path: '/', 
      maxAge: 60 * 60 * 24 * 7 
    });
  return response.data;
  }catch(error){
    console.error("Login error:", error);
    throw error;
  }
}

export async function getAllusers(page: number): Promise<PaginatedResponse<User>> {
  const response = await apiClient.get<PaginatedResponse<User>>(`/users?page=${page}&limit=8` );
  return response.data;
}

export async function currentUser(): Promise<User | null> {
  const response = await apiClient.get<User | null>("/users/me");
  return response.data;
}