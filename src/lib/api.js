import axios from "axios";
import { getToken, clearAuth } from "./auth";
import { store } from "@/store/store";
import { clearCurrentUser } from "@/store/actions/authActions";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearAuth();
      store.dispatch(clearCurrentUser());
    }
    return Promise.reject(error);
  }
);

export default api;
