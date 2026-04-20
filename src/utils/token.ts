const ACCESS = "accessToken";
const REFRESH = "refreshToken";

export const getAccessToken = () => localStorage.getItem(ACCESS);

export const setTokens = (access: string, refresh: string) => {
  localStorage.setItem(ACCESS, access);
  localStorage.setItem(REFRESH, refresh);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS);
  localStorage.removeItem(REFRESH);
};