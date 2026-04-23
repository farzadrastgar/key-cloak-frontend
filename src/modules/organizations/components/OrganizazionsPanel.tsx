import { useState } from "react";
import { OrganizationSelect } from "./OrganizationSelect";
import type { Organization } from "../types";
import { Button } from "../../../shared/components/ui/Button";
import NewOrganizationModal from "./modals/NewOrganizationModal";
import DeleteOrganizationModal from "./modals/DeleteOrganizationModal";
import OrganizationList from "./OrganizationList";

const OrganizationPanel = () => {
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <div className="flex-1 p-6 bg-white m-2 space-y-6">
            <h2 className="text-xl font-semibold text-blue-600">
                Organizations
            </h2>

            {/* Select Organization */}
            <div>
                <label className="text-sm text-gray-600">
                    Organization auswählen
                </label>

                <div className="mt-2 flex gap-2">
                    <div className="flex-1">
                        <OrganizationSelect
                            value={selectedOrg}
                            onChange={setSelectedOrg}
                        />
                    </div>

                    <Button
                        variant="primary"
                        onClick={() => setShowCreateModal(true)}
                    >
                        Erstellen
                    </Button>

                    <Button
                        variant="danger"
                        disabled={!selectedOrg}
                        onClick={() => setShowDeleteModal(true)}
                    >
                        Löschen
                    </Button>
                </div>
            </div>

            {/* Organization List */}
            <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">
                    Alle Organisationen
                </h3>

                <OrganizationList />
            </div>

            {/* Modals */}
            {showCreateModal && (
                <NewOrganizationModal
                    onClose={() => setShowCreateModal(false)}
                />
            )}

            {showDeleteModal && selectedOrg && (
                <DeleteOrganizationModal
                    organization={selectedOrg}
                    onClose={() => {
                        setShowDeleteModal(false);
                        setSelectedOrg(null);
                    }}
                />
            )}
        </div>
    );
};

export default OrganizationPanel;