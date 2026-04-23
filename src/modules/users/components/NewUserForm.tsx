import { useState, type ChangeEvent } from "react";
import InputField from "../../../shared/components/ui/InputField";
import type { CreateUserPayload } from "../types/user.types";
import { useCreateUser } from "../api/users.queries";
import { toast } from "sonner";
import { OrganizationSelect } from "../../organizations/components/OrganizationSelect"; // adjust path
import type { Organization } from "../../organizations/types";

export default function NewUserForm() {
  const [form, setForm] = useState<CreateUserPayload>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    organizationId: undefined,
  });

  const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

  const { mutate, isPending } = useCreateUser();

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // basic validation
    if (!form.email || !form.username) {
      toast.error("Email und Benutzername sind Pflichtfelder");
      return;
    }

    mutate(form, {
      onSuccess: () => {
        // optional: reset form
        setForm({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        });
      },
      onError: (err: any) => {
        toast.error(
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          "Fehler beim Erstellen des Users"
        );
      },
    });
  };

  return (
    <div className="flex-1 p-8 bg-white m-2">
      <div className="max-w-xl space-y-4">
        <InputField
          label="Vorname"
          value={form.firstName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("firstName", e.target.value)
          }
        />
        <InputField
          label="Nachname"
          value={form.lastName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("lastName", e.target.value)
          }
        />
        <InputField
          label="Benutzername"
          value={form.username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("username", e.target.value)
          }
        />
        <InputField
          label="Email"
          value={form.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("email", e.target.value)
          }
        />
        <InputField
          label="Passwort"
          type="password"
          value={form.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("password", e.target.value)
          }
        />

        <InputField
          label="Telefonnummer"
          value={form.phoneNumber || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleChange("phoneNumber", e.target.value)
          }
        />

        <div>
          <label className="block text-sm mb-1 text-gray-600">
            Organisation
          </label>

          <OrganizationSelect
            value={selectedOrg}
            onChange={(org) => {
              setSelectedOrg(org);
              setForm((prev) => ({
                ...prev,
                organizationId: org?.id,
              }));
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isPending}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600 disabled:opacity-50"
        >
          {isPending ? "Wird erstellt..." : "Benutzer anlegen"}
        </button>
      </div>
    </div>
  );
}