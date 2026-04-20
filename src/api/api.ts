import axios from "axios";
import { getAccessToken, clearTokens, setTokens } from "../utils/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // useful if you later switch to cookies
});

// =========================
// REQUEST INTERCEPTOR
// =========================
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// =========================
// RESPONSE INTERCEPTOR
// =========================
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired → try refresh once
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          clearTokens();
          return Promise.reject(error);
        }

        // call refresh endpoint
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/refresh`,
          { refreshToken }
        );

        // update tokens
        setTokens(data.accessToken, data.refreshToken);

        // retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        clearTokens();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;