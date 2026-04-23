import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { sendInvitationsRequest } from "./invitations.api";

export const useSendInvitations = () => {
    return useMutation({
        mutationFn: sendInvitationsRequest,

        onSuccess: (data) => {
            toast.success(data.message);

            // Optional: show detailed feedback
            if (data?.data) {
                const { invited, assigned, skipped } = data.data;

                if (invited?.length)
                    toast.success(`Invited: ${invited.join(", ")}`);

                if (assigned?.length)
                    toast.success(`Assigned: ${assigned.join(", ")}`);

                if (skipped?.length)
                    toast.warning(
                        `Skipped: ${skipped.map((s: any) => s.email).join(", ")}`
                    );
            }
        },

        onError: (err: any) => {
            toast.error(
                err?.response?.data?.message ||
                err?.response?.data?.error ||
                "Invitation failed"
            );
        },
    });
};
