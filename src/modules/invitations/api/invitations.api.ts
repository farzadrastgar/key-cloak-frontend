import api from "../../../core/api/apiClient";

export const sendInvitationsRequest = async (payload: {
    emails: string[];
    organizationId: string;
}) => {
    const { data } = await api.post("/invitations", payload);
    return data;
};