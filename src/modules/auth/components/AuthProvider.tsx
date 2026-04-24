import { useEffect, useState } from "react";
import { AuthContext, type User } from "../context/AuthContext";
import { authService } from "../services/auth.service";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (email: string, password: string) => {
        const data = await authService.login(email, password);
        setUser(data.user);
    };

    const logout = () => {
        authService.logout();
        setUser(null);
    };

    useEffect(() => {
        const initAuth = async () => {
            try {
                const user = await authService.me();
                setUser(user);
            } catch {
                try {
                    await authService.refresh();
                    const user = await authService.me();
                    setUser(user);
                } catch {
                    logout();
                }
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
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}