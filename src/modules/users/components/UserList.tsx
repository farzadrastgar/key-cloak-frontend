import InputField from "../../../shared/components/ui/InputField";
import type { User } from "../types/user.types";
import UserListItem from "./UserListItem";
import type { ChangeEvent } from "react";

const UserList = ({
  users,
  selectedUser,
  selectedUsers = [],
  multiSelect = false,
  search,
  onSelectUser,
  onSearch,
}: {
  users: User[];
  selectedUser?: User | null;
  selectedUsers?: User[];
  multiSelect?: boolean;
  search: string
  onSelectUser: (user: User) => void;
  onSearch: (value: string) => void;
}) => {

  const handleSearch = (value: string) => {
    onSearch(value);
  };

  const isUserSelected = (user: User) => {
    if (multiSelect) {
      return selectedUsers.some((u) => u.id === user.id);
    }
    return selectedUser?.id === user.id;
  };

  return (
    <div className="w-1/3 bg-white p-4 m-2 flex flex-col h-full mb-7">
      <InputField
        label="Benutzer suchen"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleSearch(e.target.value)
        }
      />

      <div className="space-y-3 mt-4 flex-1 overflow-y-auto">
        {users.map((user) => {
          const isSelected = isUserSelected(user);

          return (
            <div
              key={user.id}
              onClick={() => onSelectUser(user)}
              className="cursor-pointer"
            >
              <UserListItem
                user={user}
                isSelected={isSelected}
                showCheckbox={multiSelect}   // 👈 THIS IS MISSING
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;