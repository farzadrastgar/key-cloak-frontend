import api from "../../services/apiClient";
import type { AuthResponse, LoginPayload, RefreshResponse } from "./types";


export const loginRequest = async (payload: LoginPayload) => {
  const { data } = await api.post<AuthResponse>("/auth/login", payload);
  return data;
};

export const refreshRequest = async (refreshToken: string) => {
  const { data } = await api.post<RefreshResponse>("/auth/refresh", {
    refreshToken,
  });
  return data;
};

export const getMeRequest = async () => {
  const { data } = await api.get("/auth/me");
  return data;
};

export const logoutRequest = async () => {
  await api.post("/auth/logout");
};