import { useState } from "react";
import type { Organization } from "../types";
import { Button } from "../../../shared/components/ui/Button";
import NewOrganizationModal from "./modals/NewOrganizationModal";
import DeleteOrganizationModal from "./modals/DeleteOrganizationModal";
import OrganizationList from "./OrganizationList";

const OrganizationPanel = () => {
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);
    const [search, setSearch] = useState("");

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    return (
        <div className="flex-1 p-6 bg-white m-2 h-full flex flex-col">
            <h2 className="text-xl font-semibold text-blue-600">
                Organisations
            </h2>

            {/* SEARCH */}
            <div className="flex items-center gap-2 mt-4">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Organisation suchen..."
                    className="flex-1 px-3 py-2 border rounded"
                />

                <Button onClick={() => setShowCreateModal(true)}>
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

            {/* LIST */}
            <div className="flex-1 min-h-0 mt-4 overflow-y-auto">
                <OrganizationList
                    search={search}
                    selectedOrg={selectedOrg}
                    onSelect={setSelectedOrg}
                />
            </div>

            {/* MODALS */}
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