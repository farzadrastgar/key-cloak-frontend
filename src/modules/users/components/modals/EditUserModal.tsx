import { Modal, ModalActions } from "../../../../shared/components/ui/Modal";
import type { BaseModalProps } from "../../../../shared/components/ui/types/modal.types";

export default function EditUserModal({ onClose }: BaseModalProps) {
    return (
        <Modal title="Benutzer bearbeiten" onClose={onClose}>
            <div className="space-y-4">
                <input className="input" placeholder="Username" />
                <input className="input" placeholder="Email" />
            </div>

            <ModalActions onClose={onClose} />
        </Modal>
    );
}