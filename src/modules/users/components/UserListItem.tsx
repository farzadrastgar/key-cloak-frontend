import type { User } from "../types/user.types";

function UserListItem({ user }: { user: User }) {
  return (
    <div className="flex justify-between items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
      <div>
        <div className="font-medium">{`${user.firstName} ${user.lastName}`}</div>
        <div className="text-xs text-gray-500">{user.email}</div>
      </div>
      <input type="checkbox" />
    </div>
  );
}

export default UserListItem