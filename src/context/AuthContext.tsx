import { createContext } from "react";

export type User = {
  id: string;
  email: string;
};

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);