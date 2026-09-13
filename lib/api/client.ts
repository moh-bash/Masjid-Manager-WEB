import axios from "axios";

// public 
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// protected
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(async (config) => {
    let token: string | null;

   if (typeof window !== "undefined") {
   token = localStorage.getItem("token");
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value ?? null;
  }



  if(!token) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);