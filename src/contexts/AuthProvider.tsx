import { useEffect, useState } from "react";
import { AuthContext, type User } from "./AuthContext";
import { authService } from "../services/auth.service";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            const token = localStorage.getItem("accessToken");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const user = await authService.me();
                setUser(user);
            } catch {
                authService.logout();
            } finally {
                setLoading(false);
            }
        };

        initAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                setUser,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}