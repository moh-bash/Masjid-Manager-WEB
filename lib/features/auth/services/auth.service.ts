import apiClient from "@/lib/api/client";

import type {
  RegisterData,
  LoginData,
} from "../schemas/auth.schema";

import type {
  LoginResponse,
  User,
} from "../types";

export async function register(
  data: RegisterData,
): Promise<User> {
  
  const response = await apiClient.post<User>(
    "/auth/register",
    data,
  );
  console.log("Register response:", response);

  return response.data;
}

export async function login(
  data: LoginData,
): Promise<LoginResponse> {
  const response = await apiClient.post<LoginResponse>(
    "/auth/login",
    data,
  );

  return response.data;
}