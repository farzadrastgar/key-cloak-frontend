import { create } from "zustand";
import type { User } from "../types/user.types";

interface UserState {
    selectedUser: User | null;
    editingUser: User | null;
    search: string;

    setSelectedUser: (user: User | null) => void;
    setEditingUser: (user: User | null) => void;
    setSearch: (value: string) => void;

    reset: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    selectedUser: null,
    editingUser: null,
    search: "",

    setSelectedUser: (user) =>
        set((state) => ({
            selectedUser:
                state.selectedUser?.id === user?.id ? null : user,
        })),

    setEditingUser: (user) => set({ editingUser: user }),

    setSearch: (value) => set({ search: value }),

    reset: () =>
        set({
            selectedUser: null,
            editingUser: null,
            search: "",
        }),
}));