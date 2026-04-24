import { useState } from "react";
import UserList from "../components/UserList";
import NewUserForm from "../components/NewUserForm";
import ViewUser from "../components/ViewUser";
import type { User } from "../types/user.types";
import { useUsers } from "../api/users.queries";

const UsersPage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");


  const { data } = useUsers(search);
  const users = data?.data || [];
  const handleSelectUser = (user: User) => {
    setSelectedUser((prev) => (prev?.id === user.id ? null : user));
  };

  return (
    <div className="flex h-screen bg-gray-50">

      <UserList
        users={users}
        selectedUser={selectedUser}
        onSelectUser={handleSelectUser}
        onSearch={setSearch}
      />

      <div className="flex-1">
        {editingUser ? (
          <NewUserForm
            user={editingUser}
            onCancel={() => setEditingUser(null)}
            onSuccess={async (user) => {

              setEditingUser(null);
              setSelectedUser(user);
            }}
          />
        ) : selectedUser ? (
          <ViewUser
            userId={selectedUser.id}
            onEdit={(user) => setEditingUser(user)}
          />
        ) : (
          <NewUserForm onSuccess={(user) => {
            setSelectedUser(user);
          }} />
        )}
      </div>
    </div>
  );
};

export default UsersPage;