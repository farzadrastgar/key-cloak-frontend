import { Modal, ModalActions } from "../../../../components/ui/Modal";

export default function ResetPasswordModal({ onClose }: any) {
    return (
        <Modal title="Passwort zurücksetzen" onClose={onClose}>
            <div className="space-y-4">
                <input className="input" type="password" placeholder="Neues Passwort" />
                <input className="input" type="password" placeholder="Bestätigen" />
            </div>

            <ModalActions onClose={onClose} />
        </Modal>
    );
}