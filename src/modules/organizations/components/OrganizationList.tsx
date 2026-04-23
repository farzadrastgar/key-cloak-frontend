import { useOrganizations } from "./api/organizations.queries";
import OrganizationListItem from "./OrganizationsListItem";

export default function OrganizationList() {
    const { data = [], isLoading } = useOrganizations();

    if (isLoading) {
        return <div className="p-4 text-sm text-gray-500">Loading...</div>;
    }

    if (data.length === 0) {
        return <div className="p-4 text-sm text-gray-500">No organizations</div>;
    }

    return (
        <div className="space-y-2">
            {data.map((org) => (
                <OrganizationListItem key={org.id} org={org} />
            ))}
        </div>
    );
}