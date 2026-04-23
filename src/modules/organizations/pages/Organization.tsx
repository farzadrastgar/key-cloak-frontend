import { useState } from "react";
import { useUsers } from "../../users/api/users.queries";
import UserList from "../../users/components/UserList";
import type { User } from "../../users/types/user.types";
import OrganizationPanel from "../components/OrganizazionsPanel";

export default function OrganizationsPage() {
    const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

    const [search, setSearch] = useState("");

    const { data } = useUsers(search);
    const users = data?.data || [];

    const toggleUser = (user: User) => {
        setSelectedUsers((prev) => {
            const exists = prev.find((u) => u.id === user.id);

            if (exists) {
                return prev.filter((u) => u.id !== user.id);
            }

            return [...prev, user];
        });
    };

    return (
        <div className="flex h-screen bg-gray-50">
            <UserList
                users={users}
                selectedUsers={selectedUsers} // not used here
                multiSelect={true}
                onSelectUser={toggleUser}
                onSearch={setSearch}
            />
            <OrganizationPanel />
        </div>
    );
};