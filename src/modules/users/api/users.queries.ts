import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
    getUsersRequest,
    createUserRequest,
    updateUserRequest,
    deleteUserRequest,
    resetUserPasswordRequest,
} from "./users.api";
import type {
    CreateUserPayload,
    UpdateUserPayload,
    ResetPasswordPayload,
} from "../types/types";
import { toast } from "sonner";

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

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["users"] });
            toast.success("User updated");
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
    });
};