import { useState } from "react";
import { OrganizationSelect } from "../components/OrganizationSelect";
import type { Organization } from "../types";

export default function OrganizationsPage() {
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

    const handleSubmit = () => {
        console.log("Selected org:", selectedOrg);
    };

    return (
        <div className="space-y-4 max-w-md">
            <OrganizationSelect value={selectedOrg} onChange={setSelectedOrg} />
            <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-black text-white rounded"
            >
                Submit
            </button>
        </div>
    );
};