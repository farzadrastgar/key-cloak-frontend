import type { User } from "../types/user.types";
import { UserCircle } from "lucide-react";

function UserListItem({ user, isSelected }: { user: User, isSelected: boolean }) {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
      <div className="flex items-center gap-3">
        {/* Column 1: Icon */}
        <UserCircle className="w-6 h-6 text-gray-500" />

        {/* Column 2: Text */}
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
        onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

export default UserListItem