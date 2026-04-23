import { useOrganizations } from "../api/organizations.queries";
import OrganizationListItem from "./OrganizationsListItem";
import type { Organization } from "../types";

export default function OrganizationList({
    search,
    selectedOrg,
    onSelect,
}: {
    search?: string;
    selectedOrg: Organization | null;
    onSelect: (org: Organization) => void;
}) {
    const { data = [], isLoading } = useOrganizations(search);

    if (isLoading) {
        return <div className="p-4 text-sm text-gray-500">Loading...</div>;
    }

    if (data.length === 0) {
        return <div className="p-4 text-sm text-gray-500">No organizations</div>;
    }

    return (
        <div className="space-y-2">
            {data.map((org) => (
                <OrganizationListItem
                    key={org.id}
                    org={org}
                    selected={selectedOrg?.id === org.id}
                    onSelect={() => onSelect(org)}
                />
            ))}
        </div>
    );
}