// =========================
// TYPES
// =========================

import type { Organization } from "../../organizations/types";

export type User = {
    id: string;
    email: string;
    username: string;
    firstName?: string;
    lastName?: string;
    active?: boolean;
    phoneNumber: string
    organizations: Pick<Organization, "id" | "name">[]
};

export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
    organizationId?: string;
}

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