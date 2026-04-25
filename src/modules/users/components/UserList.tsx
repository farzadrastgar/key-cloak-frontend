import InputField from "../../../shared/components/ui/InputField";
import type { User } from "../types/user.types";
import UserListItem from "./UserListItem";
import type { ChangeEvent } from "react";
import { useUserStore } from "../store/user.store";

const UserList = ({ users }: { users: User[] }) => {
  const {
    selectedUser,
    search,
    setSearch,
    setSelectedUser,
  } = useUserStore();

  const isUserSelected = (user: User) => {
    return selectedUser?.id === user.id;
  };

  return (
    <div className="w-1/3 bg-white p-4 m-2 flex flex-col h-full mb-7">
      <InputField
        label="Benutzer suchen"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearch(e.target.value)
        }
      />

      <div className="space-y-3 mt-4 flex-1 overflow-y-auto">
        {users.map((user) => {
          const isSelected = isUserSelected(user);

          return (
            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className="cursor-pointer"
            >
              <UserListItem
                user={user}
                isSelected={isSelected}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;