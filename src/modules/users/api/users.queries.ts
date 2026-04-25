import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from 'axios';
import {
    getUsersRequest,
    createUserRequest,
    updateUserRequest,
    deleteUserRequest,
    resetUserPasswordRequest,
    toggleUserStatusRequest,
    getUserByIdRequest,
} from "./users.api";
import type {
    CreateUserPayload,
    UpdateUserPayload,
    ResetPasswordPayload,
} from "../types/user.types";
import { toast } from "sonner";

export const useUser = (id: string) => {
    const data = useQuery({
        queryKey: ["user", id],
        queryFn: () => getUserByIdRequest(id),
        enabled: !!id,
    });

    return data
};

export const useUsers = (search?: string) => {
    return useQuery({
        queryKey: ["users", search],
        queryFn: () => getUsersRequest(search),
    });
};

export const useCreateUser = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateUserPayload) =>
            createUserRequest(payload),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["users"] });
            toast.success("User created");
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Fehler beim Anlegen des Benutzer"
            );
        },
    });
};

export const useUpdateUser = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: UpdateUserPayload;
        }) => updateUserRequest(id, payload),

        onSuccess: (updatedUser) => {
            qc.invalidateQueries({ queryKey: ["users"] });
            qc.invalidateQueries({ queryKey: ["user", updatedUser.id] });
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Fehler beim Speichern des Benutzer"
            );
        },
    });
};

export const useDeleteUser = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUserRequest(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["users"] });
            toast.success("User deleted");
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Fehler beim Loschen des Benutzer"
            );
        },
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: ({
            id,
            payload,
        }: {
            id: string;
            payload: ResetPasswordPayload;
        }) => resetUserPasswordRequest(id, payload),

        onSuccess: () => {
            toast.success("Password updated");
        },
        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Fehler beim Reset Passwort"
            );
        },
    });
};

export const useToggleUserStatus = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            active,
        }: {
            id: string;
            active: boolean;
        }) =>
            toggleUserStatusRequest(id, { active }),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["users"] });
            toast.success("Status aktualisiert");
        },

        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Fehler beim Aktualisieren des Status"
            );
        },
    });
};