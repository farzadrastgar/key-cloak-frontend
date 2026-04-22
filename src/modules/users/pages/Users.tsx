import { useEffect, useState } from "react";
import UserList from "../components/UserList";
import NewUserForm from "../components/NewUserForm";
import ViewUser from "../components/ViewUser";
import { getUsersRequest } from "../api/users.api";
import type { User } from "../types/user.types";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const fetchUsers = async (search?: string) => {
      const data = await getUsersRequest(search);
      setUsers(data.data);
    };
    fetchUsers(search);
  }, [search]);

  // search
  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <div className="flex h-screen bg-gray-100">

      <UserList
        users={users}
        onSelectUser={setSelectedUser}
        onSearch={handleSearch}
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