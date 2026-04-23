import { useEffect, useState } from "react";
import InputField from "../../../shared/components/ui/InputField";
import type { CreateUserPayload, User } from "../types/user.types";
import { useCreateUser, useUpdateUser } from "../api/users.queries";
import { toast } from "sonner";
import { X, Plus } from "lucide-react";
import type { Organization } from "../../organizations/types";
import OrganizationPickerModal from "./modals/OrganizationsPickerModal";

interface Props {
  user?: User;
  onCancel?: () => void; // 👈 add this
}

export default function NewUserForm({ user, onCancel }: Props) {
  const isEdit = !!user;

  const [form, setForm] = useState<CreateUserPayload>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    organizationIds: [],
  });

  const [selectedOrgs, setSelectedOrgs] = useState<Organization[]>([]);
  const [openPicker, setOpenPicker] = useState(false);

  const { mutate: createUser, isPending: isCreating } = useCreateUser();
  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

  // ✅ populate for edit
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        username: user.username,
        email: user.email,
        password: "",
        phoneNumber: user.phoneNumber || "",
        organizationIds: user.organizations?.map((o) => o.id) || [],
      });

      setSelectedOrgs(user.organizations || []);
    }
  }, [user]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddOrg = (org: Organization) => {
    // prevent duplicates
    if (selectedOrgs.some((o) => o.id === org.id)) return;

    const updated = [...selectedOrgs, org];
    setSelectedOrgs(updated);

    setForm((prev) => ({
      ...prev,
      organizationIds: updated.map((o) => o.id),
    }));
  };

  const handleRemoveOrg = (id: string) => {
    const updated = selectedOrgs.filter((o) => o.id !== id);
    setSelectedOrgs(updated);

    setForm((prev) => ({
      ...prev,
      organizationIds: updated.map((o) => o.id),
    }));
  };

  const handleSubmit = () => {
    if (!form.email || !form.username) {
      toast.error("Email und Benutzername sind Pflichtfelder");
      return;
    }

    if (isEdit && user) {
      updateUser(
        {
          id: user.id,
          payload: form,
        },
        {
          onSuccess: () => {
            toast.success("User updated");
            onCancel?.(); // 👈 exit edit mode
          },
        }
      );
    } else {
      createUser(form, {
        onSuccess: () => {
          toast.success("User created");
          setSelectedOrgs([]);
        },
      });
    }
  };

  return (
    <div className="flex-1 p-8 bg-white m-2">
      <div className="max-w-xl space-y-4">

        <InputField
          label="Vorname"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
        />

        <InputField
          label="Nachname"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
        />

        <InputField
          label="Benutzername"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
        />

        <InputField
          label="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        {!isEdit && (
          <InputField
            label="Passwort"
            type="password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        )}

        <InputField
          label="Telefonnummer"
          value={form.phoneNumber || ""}
          onChange={(e) => handleChange("phoneNumber", e.target.value)}
        />

        {/* ✅ ORG SECTION */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-600">Organisationen</label>

            <button
              onClick={() => setOpenPicker(true)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <Plus size={16} />
            </button>
          </div>

          {selectedOrgs.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {selectedOrgs.map((org) => (
                <div
                  key={org.id}
                  className="flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 text-sm"
                >
                  <span>{org.name}</span>

                  <button
                    onClick={() => handleRemoveOrg(org.id)}
                    className="hover:text-red-500"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-sm">Keine Organisationen</p>
          )}
        </div>

        <div className="flex gap-2">
          {isEdit && (
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded border border-gray-300 hover:bg-gray-100"
            >
              Abbrechen
            </button>
          )}

          <button
            onClick={handleSubmit}
            disabled={isCreating || isUpdating}
            className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
          >
            {isEdit ? "Benutzer speichern" : "Benutzer anlegen"}
          </button>
        </div>

        {/* ✅ MODAL */}
        {openPicker && (
          <OrganizationPickerModal
            onClose={() => setOpenPicker(false)}
            onSubmit={handleAddOrg}
          />
        )}
      </div>
    </div>

  );
}