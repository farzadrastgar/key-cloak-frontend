import api from "../../../core/api/apiClient";
import type { CreateOrganizationPayload, Organization } from "../types";


export const getOrganizationsRequest = async (search?: string) => {
    const { data } = await api.get<{ message: string; data: Organization[] }>(
        "/organizations",
        {
            params: search ? { search } : undefined,
        }
    );

    return data.data; // ✅ unwrap here
};

// CREATE ORGANIZATION
export const createOrganizationRequest = async (
    payload: CreateOrganizationPayload
) => {
    const { data } = await api.post<Organization>("/organizations", payload);
    return data;
};

// GET ORGANIZATION BY ID
export const getOrganizationByIdRequest = async (id: string) => {
    const { data } = await api.get<Organization>(`/organizations/${id}`);
    return data;
};


// DELETE ORGANIZATION
export const deleteOrganizationRequest = async (id: string) => {
    await api.delete(`/organizations/${id}`);
};

// ASSIGN USERS TO ORGANIZATION
export const assignUserToOrganizationRequest = async (
    orgId: string,
    userId: string
) => {
    const { data } = await api.post(
        `/organizations/${orgId}/users/${userId}`
    );
    return data;
};

export const unassignUserFromOrganizationRequest = async (
    orgId: string,
    userId: string
) => {
    const { data } = await api.delete(
        `/organizations/${orgId}/users/${userId}`
    );
    return data;
};