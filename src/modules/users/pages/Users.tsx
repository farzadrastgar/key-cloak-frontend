import { useState } from "react";
import UserList from "../components/UserList";
import NewUserForm from "../components/NewUserForm";
import ViewUser from "../components/ViewUser";
import type { User } from "../types/user.types";
import { useUsers } from "../api/users.queries";

const UsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");


  const { data, isLoading } = useUsers(search);
  const users = data?.data || [];
  const handleSelectUser = (user: User) => {
    setSelectedUser((prev) => (prev?.id === user.id ? null : user));
  };



  return (
    <div className="flex h-screen bg-gray-100">

      <UserList
        users={users}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        onSearch={setSearch}
      />

      <div className="flex-1">
        {selectedUser ? (
          <ViewUser user={selectedUser} />
        ) : (
          <NewUserForm />
        )}
      </div>
    </div>
  );
};

export default UsersPage;