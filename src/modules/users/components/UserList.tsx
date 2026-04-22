import InputField from "../../../components/ui/InputField";
import type { User } from "../types/types";
import UserListItem from "./UserListItem";
import { useState, type ChangeEvent } from "react";

const List = ({
  users,
  onSelectUser,
  onSearch,
}: {
  users: User[];
  onSelectUser: (user: User) => void;
  onSearch: (value: string) => void;
}) => {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="w-1/3 bg-white border-r p-4">
      <InputField
        label="Benutzer suchen"
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleSearch(e.target.value)}
      />

      <div className="space-y-3 mt-4">
        {users.map((user) => (
          <div key={user.id} onClick={() => onSelectUser(user)}>
            <UserListItem user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;