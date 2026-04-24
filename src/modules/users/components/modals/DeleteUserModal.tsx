import { Button } from "../../../../shared/components/ui/Button";
import { Modal } from "../../../../shared/components/ui/Modal";
import { useDeleteUser } from "../../api/users.queries";
import type { DeleteUserModalProps } from "../../types/user-ui.types";

export default function DeleteUserModal({ user, onClose }: DeleteUserModalProps) {
    const { mutate, isPending } = useDeleteUser();

    const handleDelete = () => {
        mutate(user.id, {
            onSuccess: onClose,
        });
    };

    return (
        <Modal title="Benutzer löschen" onClose={onClose}>
            <p className="text-gray-600">
                Möchten Sie diesen Benutzer wirklich löschen?
            </p>

            <div className="flex justify-end gap-2 mt-6">
                <Button
                    onClick={onClose}
                    variant="secondary"
                    className="px-4 py-2"
                >
                    Abbrechen
                </Button>

                <Button
                    onClick={handleDelete}
                    loading={isPending}
                    variant="danger"
                    className="px-4 py-2"
                >
                    Löschen
                </Button>
            </div>
        </Modal>
    );
}