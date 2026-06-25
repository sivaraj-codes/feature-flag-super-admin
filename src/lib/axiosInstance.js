import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.error || "Something went wrong";
    // Don't redirect on /auth/me 401 — AuthContext handles it
    if (
      err.response?.status === 401 &&
      !err.config?.url?.includes("/auth/me")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(new Error(message));
  }
);
