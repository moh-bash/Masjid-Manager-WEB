import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  let token;

  if (typeof window !== "undefined") {
   token = localStorage.getItem("token");
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value;
  }

  if(!token) {
    const { redirect } = await import("next/navigation");
    redirect("/login");
  }

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;