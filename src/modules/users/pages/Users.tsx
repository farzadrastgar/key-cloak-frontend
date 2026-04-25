import { useEffect } from "react";
import UserList from "../components/UserList";
import NewUserForm from "../components/NewUserForm";
import ViewUser from "../components/ViewUser";
import { useUsers } from "../api/users.queries";
import { useSearchParams } from "react-router-dom";
import { useUserStore } from "../store/user.store";

const UsersPage: React.FC = () => {
  const [searchParams] = useSearchParams();

  const initialQuery = searchParams.get("query") || "";


  const {
    selectedUser,
    editingUser,
    search,
    setSearch,
  } = useUserStore();
  console.log('#')
  console.log(selectedUser)
  console.log(editingUser)
  // sync initial query
  useEffect(() => {
    setSearch(initialQuery);
  }, [initialQuery, setSearch]);


  const { data } = useUsers(search);
  const users = data?.data || [];


  return (
    <div className="flex h-screen bg-gray-50">

      <UserList
        users={users}
      />

      <div className="flex-1">
        {editingUser ? (
          <NewUserForm
            user={editingUser}
          />
        ) : selectedUser ? (
          <ViewUser
            userId={selectedUser.id}
          />
        ) : (
          <NewUserForm />
        )}
      </div>
    </div>
  );
};

export default UsersPage;