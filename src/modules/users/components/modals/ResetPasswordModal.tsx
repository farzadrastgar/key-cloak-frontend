import { useState } from "react";
import { Modal } from "../../../../shared/components/ui/Modal";
import type { BaseModalProps } from "../../../../shared/components/ui/types/modal.types";
import type { User } from "../../types/user.types";
import { useResetPassword } from "../../api/users.queries";
import { toast } from "sonner";
import { Button } from "../../../../shared/components/ui/Button";
import InputField from "../../../../shared/components/ui/InputField";

interface Props extends BaseModalProps {
    user: User;
}

export default function ResetPasswordModal({ user, onClose }: Props) {
    const { mutate, isPending } = useResetPassword();

    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const handleChange = (field: string, value: string) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        if (!form.password || !form.confirmPassword) {
            toast.error("Bitte alle Felder ausfüllen");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwörter stimmen nicht überein");
            return;
        }

        mutate(
            {
                id: user.id,
                payload: { newPassword: form.password },
            },
            {
                onSuccess: () => {
                    toast.success("Passwort erfolgreich geändert");
                    onClose();
                },
                onError: (err: any) => {
                    console.log(err)
                    toast.error(err?.response?.data?.message ||
                        err?.response?.data?.error || "Fehler beim Zurücksetzen des Passworts");
                },
            }
        );
    };

    return (
        <Modal title="Passwort zurücksetzen" onClose={onClose}>
            <div className="space-y-4">
                {/* Password */}
                <div className="flex flex-col">

                    <InputField
                        label="Neues Passwort"
                        type="password"
                        value={form.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <InputField
                        id="confirmPassword"
                        label="Passwort bestätigen"
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
                <Button
                    onClick={onClose}
                    variant="secondary"
                    className="px-4 py-2"
                >
                    Abbrechen
                </Button>

                <Button
                    onClick={handleSubmit}
                    loading={isPending}
                    disabled={isPending}
                    variant="primary"
                    className="px-4 py-2"
                >
                    Speichern
                </Button>
            </div>
        </Modal>
    );
}