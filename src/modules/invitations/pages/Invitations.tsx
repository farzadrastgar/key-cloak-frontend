import { useState } from "react";
import UserList from "../../users/components/UserList";
import type { User } from "../../users/types/user.types";
import { useUsers } from "../../users/api/users.queries";
import InvitationPanel from "../components/InvitationPanel";

export default function InvitationsPage() {
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

            <InvitationPanel selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} />
        </div>
    );
}