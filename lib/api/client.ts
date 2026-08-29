import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

apiClient.interceptors.request.use(async (config) => {
  let token;

  if (typeof window !== "undefined") {
    const match = document.cookie.match(/(^|;)\s*token\s*=\s*([^;]+)/);
    token = match ? match[2] : null;
  } else {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    token = cookieStore.get("token")?.value;
  }

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiClient;