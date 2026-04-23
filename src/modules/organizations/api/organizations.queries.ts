import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createOrganizationRequest,
    deleteOrganizationRequest,
    getOrganizationsRequest,
    assignUserToOrganizationRequest,
    unassignUserFromOrganizationRequest,
} from "./organizations.api";
import type { CreateOrganizationPayload } from "../types";
import { toast } from "sonner";

export const useOrganizations = (search?: string) => {
    return useQuery({
        queryKey: ["organizations", search],
        queryFn: () => getOrganizationsRequest(search),
    });
};

export const useCreateOrganization = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (payload: CreateOrganizationPayload) =>
            createOrganizationRequest(payload),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["organizations"] });
            toast.success("Organization created");
        },
        onError: () => {
            toast.error("Failed to create organization");
        },
    });
};

export const useDeleteOrganization = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteOrganizationRequest(id),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["organizations"] });
            toast.success("Organization deleted");
        },
        onError: () => {
            toast.error("Failed to delete organization");
        },
    });
};

export const useAssignUserToOrganization = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({
            orgId,
            userId,
        }: {
            orgId: string;
            userId: string;
        }) => assignUserToOrganizationRequest(orgId, userId),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["organizations"] });
            toast.success("User assigned to organization");
        },
        onError: () => {
            toast.error("Failed to assign user");
        },
    });
};

export const useUnassignUserFromOrganization = () => {
    const qc = useQueryClient();

    return useMutation({
        mutationFn: ({
            orgId,
            userId,
        }: {
            orgId: string;
            userId: string;
        }) => unassignUserFromOrganizationRequest(orgId, userId),

        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ["organizations"] });
            toast.success("User removed from organization");
        },
        onError: () => {
            toast.error("Failed to remove user");
        },
    });
};