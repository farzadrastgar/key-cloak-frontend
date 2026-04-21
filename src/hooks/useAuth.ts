import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { authService } from "../services/auth.service";


export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }

    const { user, loading, setUser } = context;

    const login = async (email: string, password: string) => {
        const data = await authService.login(email, password);

        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        setUser(data.user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        window.location.href = "/login";
    };

    return {
        user,
        loading,
        login,
        logout,
    };
}