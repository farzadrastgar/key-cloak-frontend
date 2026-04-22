import { useState } from "react";
import DeleteUserModal from "./modals/DeleteUserModal";
import EditUserModal from "./modals/EditUserModal";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import type { User } from "../types/user.types";
import UserMenu from "./UserMenu";
import { useToggleUserStatus } from "../api/users.queries";
export default function ViewUser({ user }: { user: User }) {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const { mutate, isPending } = useToggleUserStatus();

  const handleToggle = () => {
    mutate({
      id: user.id,
      active: !user.active,
    });
  };

  return (
    <div className="p-2 bg-gray-50 min-h-screen">
      <div className="bg-white  shadow p-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-blue-600">
            {user.firstName} {user.lastName}
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={handleToggle}
              disabled={isPending}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${user.active ? "bg-blue-500" : "bg-gray-300"
                } ${isPending ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${user.active ? "translate-x-6" : ""
                  }`}
              />
            </button>


            <UserMenu onSelect={setOpenModal} />
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-2 text-gray-700">
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> -</p>
        </div>
      </div>

      {/* Modals */}
      {
        openModal === "edit" && (
          <EditUserModal onClose={() => setOpenModal(null)} />
        )
      }
      {
        openModal === "delete" && (
          <DeleteUserModal onClose={() => setOpenModal(null)} user={user} />
        )
      }
      {
        openModal === "password" && (
          <ResetPasswordModal onClose={() => setOpenModal(null)} user={user} />
        )
      }
    </div >
  );
}