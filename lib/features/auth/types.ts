export interface User {
  id: string;
  name: string;
  email: string;

  roles: string[];
}

export interface LoginResponse {
  token: string;

  user: User;
}