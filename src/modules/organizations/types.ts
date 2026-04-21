// =========================
// TYPES
// =========================

export type Organization = {
    id: string;
    name: string;
    parentId?: string | null;
};

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