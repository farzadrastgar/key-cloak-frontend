import { Modal } from "../../../../shared/components/ui/Modal";
import { useDeleteOrganization } from "../api/organizations.queries";
import type { Organization } from "../../types";

export default function DeleteOrganizationModal({
    organization,
    onClose,
}: {
    organization: Organization;
    onClose: () => void;
}) {
    const { mutate, isPending } = useDeleteOrganization();

    const handleDelete = () => {
        mutate(organization.id, {
            onSuccess: onClose,
        });
    };

    return (
        <Modal title="Organisation löschen" onClose={onClose}>
            <p className="text-gray-600">
                Möchten Sie diese Organisation wirklich löschen?
            </p>

            <div className="flex justify-end gap-2 mt-6">
                <button
                    className="px-4 py-2 bg-gray-200 rounded"
                    onClick={onClose}
                >
                    Abbrechen
                </button>

                <button
                    onClick={handleDelete}
                    disabled={isPending}
                    className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
                >
                    Löschen
                </button>
            </div>
        </Modal>
    );
}