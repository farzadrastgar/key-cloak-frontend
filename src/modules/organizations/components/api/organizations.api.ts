import api from "../../../../services/apiClient";
import type { AssignUsersPayload, CreateOrganizationPayload, Organization } from "../../types";


export const getOrganizationsRequest = async (search?: string) => {
    const { data } = await api.get<Organization[]>("/organizations", {
        params: search ? { search } : undefined,
    });
    return data.data;
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
export const assignUsersToOrganizationRequest = async (
    id: string,
    payload: AssignUsersPayload
) => {
    const { data } = await api.post(
        `/organizations/${id}/users`,
        payload
    );
    return data;
};