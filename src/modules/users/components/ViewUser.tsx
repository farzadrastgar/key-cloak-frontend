import { useState } from "react";
import DeleteUserModal from "./modals/DeleteUserModal";
import EditUserModal from "./modals/EditUserModal";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import type { User } from "../types/types";
import UserMenu from "./UserMenu";

export default function ViewUser({ user }: { user: User }) {
  const [active, setActive] = useState(user.active ?? true);
  const [openModal, setOpenModal] = useState<string | null>(null);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-2xl shadow p-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-blue-600">
            {user.firstName} {user.lastName}
          </h1>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setActive(!active)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${active ? "bg-blue-500" : "bg-gray-300"
                }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow transform transition ${active ? "translate-x-6" : ""
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
      {openModal === "edit" && (
        <EditUserModal onClose={() => setOpenModal(null)} />
      )}
      {openModal === "delete" && (
        <DeleteUserModal onClose={() => setOpenModal(null)} />
      )}
      {openModal === "password" && (
        <ResetPasswordModal onClose={() => setOpenModal(null)} />
      )}
    </div>
  );
}