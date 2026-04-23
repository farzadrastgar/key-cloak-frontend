// =========================
// TYPES
// =========================

export interface Organization {
    id: string;
    name: string;
    description?: string | null;
    createdAt: string;
    parentId?: string | null;
    children?: Organization[];
}

export type CreateOrganizationPayload = {
    name: string;
    parentId?: string;
};

export type UpdateOrganizationPayload = {
    name?: string;
};

export type AssignUsersPayload = {
    userIds: string[];
};