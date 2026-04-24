import api from "../../../core/api/apiClient";
import { setTokens, clearTokens, getRefreshToken } from "../utils/token";

export const authService = {
    async login(email: string, password: string) {
        const { data } = await api.post("/auth/login", { email, password });
        setTokens(data.accessToken, data.refreshToken);
        return data;
    },

    async me() {
        const { data } = await api.get("/auth/me");
        return data;
    },

    async refresh() {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error("No refresh token");

        const { data } = await api.post("/auth/refresh", { refreshToken });
        setTokens(data.accessToken, data.refreshToken);
        return data;
    },

    logout() {
        clearTokens();
    },
};