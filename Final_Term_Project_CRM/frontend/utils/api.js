import axios from "axios";

// ─── Axios Instance ───────────────────────────────────────────────────────────
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

console.log("API baseURL:", api.defaults.baseURL); // add this line

// ─── Request Interceptor — Attach JWT Token ───────────────────────────────────
api.interceptors.request.use(
  (config) => {
    // localStorage is only available in the browser (not during SSR)
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("crm_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Response Interceptor — Handle 401 Unauthorised ──────────────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      typeof window !== "undefined"
    ) {
      // Clear stale credentials and redirect to login
      localStorage.removeItem("crm_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
