
export type Role =
  | "SYSTEM_ADMIN"
  | "MOSQUE_MANAGER"
  | "CIRCLE_TEACHER"
  | "PARENT";

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;

  role: Role[];
}

export interface LoginResponse {
  token: string;
  role: Role[];
}