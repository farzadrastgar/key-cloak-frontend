import { useState } from "react";
import { Modal } from "../../../../shared/components/ui/Modal";
import type { Organization } from "../../../organizations/types";
import { OrganizationSelect } from "../../../organizations/components/OrganizationSelect";

interface Props {
    onClose: () => void;
    onSubmit: (org: Organization | null) => void;
}

export default function OrganizationPickerModal({
    onClose,
    onSubmit,
}: Props) {
    const [selected, setSelected] = useState<Organization | null>(null);

    const handleSubmit = () => {
        if (!selected) return;
        onSubmit(selected);
        onClose();
    };

    return (
        <Modal title="Organisation auswählen" onClose={onClose}>
            <div className="space-y-4">

                <OrganizationSelect
                    value={selected}
                    onChange={(org) => {
                        if (org) setSelected(org);
                    }}
                />

                <div className="flex justify-end gap-2 pt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded"
                    >
                        Abbrechen
                    </button>

                    <button
                        onClick={handleSubmit}
                        disabled={!selected}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                    >
                        Hinzufügen
                    </button>
                </div>
            </div>
        </Modal>
    );
}