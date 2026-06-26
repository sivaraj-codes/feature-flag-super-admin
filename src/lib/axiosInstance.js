import axios from "axios";
import { PUBLIC_PATHS } from "../shared/constants";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.message || "Something went wrong";
    // Don't redirect on /auth/me 401 — AuthContext handles it
    if (
      err.response?.status === 401 &&
      !PUBLIC_PATHS.includes(window.location.pathname) &&
      !err.config?.url?.includes("/auth/me")
    ) {
      window.location.href = "/login";
    }
    return Promise.reject(new Error(message));
  },
);
