import { useState } from "react";
import { Modal } from "../../../../shared/components/ui/Modal";
import { OrganizationSelect } from "../OrganizationSelect";
import { useCreateOrganization } from "../../api/organizations.queries";
import type { Organization } from "../../types";

export default function NewOrganizationModal({ onClose }: { onClose: () => void }) {
    const [name, setName] = useState("");
    const [parent, setParent] = useState<Organization | null>(null);

    const { mutate, isPending } = useCreateOrganization();

    const handleSubmit = () => {
        if (!name.trim()) return;

        mutate(
            {
                name,
                parentId: parent?.id,
            },
            {
                onSuccess: onClose,
            }
        );
    };

    return (
        <Modal title="Neue Organisation erstellen" onClose={onClose}>
            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    Erstellen Sie eine neue Organisation und wählen Sie optional eine Parent-Organisation.
                </p>

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Organisationsname"
                    className="w-full border px-3 py-2 rounded"
                />

                <OrganizationSelect
                    value={parent}
                    onChange={setParent}
                />

                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Abbrechen
                    </button>
                    <button
                        onClick={handleSubmit}
                        disabled={isPending}
                        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
                    >
                        Erstellen
                    </button>
                </div>
            </div>
        </Modal>
    );
}