import { useState } from "react";
import DeleteUserModal from "./modals/DeleteUserModal";
import EditUserModal from "./modals/EditUserModal";
import ResetPasswordModal from "./modals/ResetPasswordModal";
import type { User } from "../types/user.types";
import UserMenu from "./UserMenu";
import { useToggleUserStatus } from "../api/users.queries";
import { Mail, Phone, UserCircle, X } from "lucide-react";
export default function ViewUser({ user }: { user: User }) {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const { mutate, isPending } = useToggleUserStatus();

  const handleToggle = () => {
    mutate({
      id: user.id,
      active: !user.active,
    });
  };

  const handleRemoveOrg = (orgId: string) => {
    console.log("remove org", orgId);
    // call your mutation here
    // removeUserFromOrg({ userId: user.id, orgId })
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

        <div className="grid grid-cols-2 gap-10 mb-6 text-sm">
          {/* Row 1 - Left */}
          <div className="space-y-4">
            {/* Username */}
            <div>
              <div className="flex items-center gap-2 text-gray-500">
                <UserCircle size={16} className="text-gray-400" />
                <span>Username</span>
              </div>
              <p>{user.username || "-"}</p>
            </div>

            {/* Email */}
            <div>
              <div className="flex items-center gap-2 text-gray-500">
                <Mail size={16} className="text-gray-400" />
                <span>Email</span>
              </div>
              <p>{user.email || "-"}</p>
            </div>

            <div>
              <div className="flex items-center gap-2 text-gray-500">
                <Phone size={16} className="text-gray-400" />
                <span>Telephone</span>
              </div>
              <p >{user.phoneNumber || "-"}</p>
            </div>
          </div>

          {/* Row 1 - Right */}
          <div>
            <h3 className="text-blue-600 font-medium mb-2">
              Globale Berechtigungen
            </h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Systemadministrator
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Globaler Benutzeradministrator
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Globaler 3rd-Level Benutzer
              </label>
            </div>
          </div>



          {/* Row 2 - Right */}
          <div>
            <h3 className="text-blue-600 font-medium mb-2">
              Benutzer Authentifizierung
            </h3>
            <p className="text-gray-600">
              Der Benutzer kann sich momentan nicht anmelden. Wenn die globalen Einstellungen eine Authentifizierung zulassen muss der Benutzer seine Konfiguration noch abschließen.
            </p>
          </div>

          {/* Row 2 - Left */}
          <div>
            <h3 className="text-blue-600 font-medium mb-2">
              Multifaktor Authentifizierung
            </h3>
            <p className="text-gray-600">
              Entweder sehen die globalen Einstellungen keine 2-FA Authentifizierung vor oder der
              Benutzer hat kein Gerät dafür eingerichtet.
            </p>
          </div>
        </div>

        <h3 className="text-blue-600 font-medium mb-2">
          Organizationen wechseln
        </h3>

        {user.organizations && user.organizations.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {user.organizations.map((org) => (
              <div
                key={org.id}
                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 text-sm"
              >

                <span>{org.name}</span>

                {/* X button on LEFT */}
                <button
                  onClick={() => handleRemoveOrg(org.id)}
                  className="hover:text-red-500"
                >
                  <X size={14} className="cursor-pointer" />

                </button>

              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm">Keine Organisationen</p>
        )}
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