import api from "../../../services/apiClient";
import type { CreateUserPayload, ResetPasswordPayload, ToggleUserStatusPayload, UpdateUserPayload, User } from "../types/user.types";


// GET USERS
export const getUsersRequest = async (search?: string) => {
    const { data } = await api.get<{ data: User[] }>("/users", {
        params: search ? { search } : undefined,
    });
    return data;
};

// CREATE USER
export const createUserRequest = async (payload: CreateUserPayload) => {
    const { data } = await api.post<{ message: string; data: User }>("/users", payload);
    return data.data;
};

export const getUserByIdRequest = async (id: string) => {
    const { data } = await api.get<{ message: string; data: User }>(`/users/${id}`);
    return data.data; // ✅ unwrap here
};

// UPDATE USER
export const updateUserRequest = async (
    id: string,
    payload: UpdateUserPayload
) => {
    const { data } = await api.patch<{ message: string; data: User }>(`/users/${id}`, payload);
    return data.data;
};

// DELETE USER
export const deleteUserRequest = async (id: string) => {
    await api.delete(`/users/${id}`);
};

// TOGGLE USER STATUS
export const toggleUserStatusRequest = async (
    id: string,
    payload: ToggleUserStatusPayload
) => {
    const { data } = await api.patch<User>(
        `/users/${id}/toggleStatus`,
        payload
    );
    return data;
};

// RESET PASSWORD
export const resetUserPasswordRequest = async (
    id: string,
    payload: ResetPasswordPayload
) => {
    const { data } = await api.patch(
        `/users/${id}/reset-password`,
        payload
    );
    return data;
};