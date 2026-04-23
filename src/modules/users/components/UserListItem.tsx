import type { User } from "../types/user.types";
import { UserCircle } from "lucide-react";

function UserListItem({
  user,
  isSelected,

}: {
  user: User;
  isSelected: boolean;
  showCheckbox?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center p-2 rounded cursor-pointer transition
        ${isSelected ? "bg-blue-50" : "hover:bg-gray-100"}
      `}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <UserCircle className="w-6 h-6 text-gray-500" />

        {/* Text */}
        <div>
          <div className="font-medium">
            {`${user.firstName} ${user.lastName}`}
          </div>
          <div className="text-xs text-gray-500">
            {user.email}
          </div>
        </div>
      </div>


      <input
        type="checkbox"
        checked={isSelected}
        readOnly
        onClick={(e) => e.stopPropagation()} // prevents row click duplication
        className="cursor-pointer"
      />

    </div>
  );
}

export default UserListItem;