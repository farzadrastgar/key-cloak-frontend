// =========================
// TYPES
// =========================

export type InviteUsersPayload = {
    emails: string[];
    organizationId: string;
};

export type Invitation = {
    id: string;
    email: string;
    organizationId: string;
    status?: "pending" | "accepted" | "rejected";
    createdAt?: string;
};
