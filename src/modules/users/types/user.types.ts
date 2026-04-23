// =========================
// TYPES
// =========================

export type User = {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    active?: boolean;
    phoneNumber: string
};

export type CreateUserPayload = {
    email: string;
    username: string;
    password: string;
    firstName?: string;
    lastName?: string;
};

export type UpdateUserPayload = {
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    active?: boolean;
};

export type ResetPasswordPayload = {
    newPassword: string;
};

export type ToggleUserStatusPayload = {
    active: boolean;
};

export type ApiError = {
    message?: string | string[];
    error?: string;
    statusCode?: number;
};