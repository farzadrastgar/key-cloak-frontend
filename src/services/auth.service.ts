import api from "./apiClient";

export const authService = {
    async login(email: string, password: string) {
        const { data } = await api.post("/auth/login", { email, password });
        return data;
    },

    async me() {
        const { data } = await api.get("/auth/me");
        return data;
    },

    logout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    },
};