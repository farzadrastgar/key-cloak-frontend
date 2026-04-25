import InputField from "../../../shared/components/ui/InputField";
import type { User } from "../types/user.types";
import UserListItem from "./UserListItem";
import type { ChangeEvent } from "react";
import { useUserStore } from "../store/user.store";

type Props = {
  users: User[];

  // controlled props (optional)
  selectedUser?: User | null;
  selectedUsers?: User[];
  multiSelect?: boolean;
  search?: string;

  onSelectUser?: (user: User) => void;
  onSearch?: (value: string) => void;
};

const UserList = ({
  users,
  selectedUser,
  selectedUsers = [],
  multiSelect = false,
  search,
  onSelectUser,
  onSearch,
}: Props) => {
  // Zustand fallback
  const store = useUserStore();

  const effectiveSearch = search ?? store.search;
  const effectiveSelectedUser = selectedUser ?? store.selectedUser;

  const handleSearch = (value: string) => {
    if (onSearch) return onSearch(value);
    store.setSearch(value);
  };

  const handleSelectUser = (user: User) => {
    if (onSelectUser) return onSelectUser(user);
    store.setSelectedUser(user);
  };

  const isUserSelected = (user: User) => {
    if (multiSelect) {
      return selectedUsers.some((u) => u.id === user.id);
    }
    return effectiveSelectedUser?.id === user.id;
  };

  return (
    <div className="w-1/3 bg-white p-4 m-2 flex flex-col h-full mb-7">
      <InputField
        label="Benutzer suchen"
        value={effectiveSearch}
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
              onClick={() => handleSelectUser(user)}
              className="cursor-pointer"
            >
              <UserListItem
                user={user}
                isSelected={isSelected}
                showCheckbox={multiSelect}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;