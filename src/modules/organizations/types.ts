import type { User } from "../users/types/user.types";

export interface Membership {
    id: string;
    userId: string;
    organizationId: string;
    role: string;
    createdAt: string;
    user: User;
}

export interface Organization {
    id: string;
    name: string;
    description?: string | null;
    createdAt?: string;

    parentId?: string | null;
    parent?: Organization | null;

    children?: Organization[];

    memberships?: Membership[];
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

export type getOrganizationsResponse = {
    message: string;
    data: Organization[];
};