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
    memberships: {
        organization: Pick<Organization, "id" | "name">;
    }[];
};

export interface CreateUserPayload {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    phoneNumber?: string;
    organizationIds?: string[];
}

export type UpdateUserPayload = {
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    active?: boolean;
    organizationIds?: string[];
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