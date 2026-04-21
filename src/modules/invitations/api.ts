import api from "../../services/apiClient";
import type { Invitation, InviteUsersPayload } from "./types";

// =========================
// INVITATIONS API CALLS
// =========================

// INVITE USERS
export const inviteUsersRequest = async (payload: InviteUsersPayload) => {
    const { data } = await api.post("/invitations", payload);
    return data;
};

// GET INVITATIONS
export const getInvitationsRequest = async () => {
    const { data } = await api.get<Invitation[]>("/invitations");
    return data;
};