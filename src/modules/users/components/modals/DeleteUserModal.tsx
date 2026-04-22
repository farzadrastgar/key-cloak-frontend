import { Modal } from "../../../../components/ui/Modal";
import type { BaseModalProps } from "../../../../components/ui/types/modal.types";


export default function DeleteUserModal({ onClose }: BaseModalProps) {
    return (
        <Modal title="Benutzer löschen" onClose={onClose}>
            <p className="text-gray-600">
                Möchten Sie diesen Benutzer wirklich löschen?
            </p>

            <div className="flex justify-end gap-2 mt-6">
                <button className="px-4 py-2 bg-gray-200 rounded" onClick={onClose}>
                    Abbrechen
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded">
                    Löschen
                </button>
            </div>
        </Modal>
    );
}