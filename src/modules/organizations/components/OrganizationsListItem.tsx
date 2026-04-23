import type { Organization } from "../types";

export default function OrganizationListItem({
    org,
    selected,
    onSelect,
}: {
    org: Organization;
    selected: boolean;
    onSelect: () => void;
}) {
    const parentName = org.parent?.name || "-";

    const childrenNames =
        org.children && org.children.length > 0
            ? org.children.map((c) => c.name).join(", ")
            : "-";

    const userNames =
        org.memberships && org.memberships.length > 0
            ? org.memberships
                .map((m) => {
                    const u = m.user;
                    return u.firstName && u.lastName
                        ? `${u.firstName} ${u.lastName}`
                        : u.username;
                })
                .join(", ")
            : "-";

    return (
        <div
            onClick={onSelect}
            className={`border rounded p-4 space-y-2 cursor-pointer transition
                ${selected ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"}
            `}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="font-medium">{org.name || "-"}</div>

                {/* Checkbox */}
                <input
                    type="checkbox"
                    checked={selected}
                    readOnly
                    className="pointer-events-none"
                />
            </div>

            {/* Parent */}
            <div className="text-sm text-gray-600">
                Parent: {parentName}
            </div>

            {/* Children */}
            <div className="text-sm text-gray-600">
                Children: {childrenNames}
            </div>

            {/* Users */}
            <div className="text-sm text-gray-600">
                Users: {userNames}
            </div>
        </div>
    );
}