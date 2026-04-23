import type { Organization } from "../types";

export default function OrganizationListItem({
    org,
}: {
    org: Organization;
}) {
    return (
        <div className="border rounded p-3 space-y-2 bg-white">
            <div className="font-medium">{org.name}</div>

            {org.parentId && (
                <div className="text-xs text-gray-500">
                    Parent ID: {org.parentId}
                </div>
            )}

            {org.children && org.children.length > 0 && (
                <div className="text-sm">
                    <div className="font-medium text-gray-600">Children:</div>
                    <ul className="list-disc ml-4">
                        {org.children.map((child) => (
                            <li key={child.id}>{child.name}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}