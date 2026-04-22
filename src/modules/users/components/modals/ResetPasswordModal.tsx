import { useState, type ChangeEvent } from "react";
import { AxiosError } from "axios";
import { Modal } from "../../../../components/ui/Modal";
import type { BaseModalProps } from "../../../../components/ui/types/modal.types";
import type { User } from "../../types/user.types";
import { useResetPassword } from "../../api/users.queries";
import { toast } from "sonner";

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
                    <label className="text-sm text-gray-600 mb-1">
                        Neues Passwort
                    </label>
                    <input
                        className="input"
                        type="password"
                        value={form.password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange("password", e.target.value)
                        }
                    />
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">
                        Passwort bestätigen
                    </label>
                    <input
                        className="input"
                        type="password"
                        value={form.confirmPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            handleChange("confirmPassword", e.target.value)
                        }
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 mt-6">
                <button
                    onClick={onClose}
                    className="px-4 py-2 bg-gray-200 rounded cursor-pointer hover:bg-gray-300"
                >
                    Abbrechen
                </button>

                <button
                    onClick={handleSubmit}
                    disabled={isPending}
                    className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600 disabled:opacity-50"
                >
                    {isPending ? "Speichern..." : "Speichern"}
                </button>
            </div>
        </Modal>
    );
}