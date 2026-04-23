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
                <button className="px-4 py-2 bg-gray-200 rounded cursor-pointer" onClick={onClose}>
                    Abbrechen
                </button>
                <button
                    className="px-4 py-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleDelete} disabled={isPending}>
                    Löschen
                </button>

            </div>
        </Modal>
    );
}