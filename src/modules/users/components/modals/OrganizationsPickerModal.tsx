import { useState } from "react";
import { Modal } from "../../../../shared/components/ui/Modal";
import type { Organization } from "../../../organizations/types";
import { OrganizationSelect } from "../../../organizations/components/OrganizationSelect";
import { Button } from "../../../../shared/components/ui/Button";

interface Props {
    onClose: () => void;
    onSubmit: (org: Organization) => void;
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
                    <Button
                        onClick={onClose}
                        variant="secondary"
                        className="px-4 py-2"
                    >
                        Abbrechen
                    </Button>

                    <Button
                        onClick={handleSubmit}
                        disabled={!selected}
                        variant="primary"
                        className="px-4 py-2"
                    >
                        Hinzufügen
                    </Button>
                </div>
            </div>
        </Modal>
    );
}