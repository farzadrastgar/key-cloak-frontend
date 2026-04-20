import api from "./api";

// =========================
// TYPES (optional but recommended)
// =========================
export type LoginPayload = {
  email: string;
  password: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
};

export type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
};

// =========================
// AUTH API CALLS
// =========================

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