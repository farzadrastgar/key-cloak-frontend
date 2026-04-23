import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createOrganizationRequest,
    deleteOrganizationRequest,
    getOrganizationsRequest,
} from "./organizations.api";
import type { CreateOrganizationPayload } from "../../types";
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