import { useState, type ChangeEvent } from "react";
import InputField from "../../../components/ui/InputField";
import { createUserRequest } from "../api/users.api";
import type { CreateUserPayload } from "../types/types";

export default function NewUserForm() {
  const [form, setForm] = useState<CreateUserPayload>({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    await createUserRequest(form);
    alert("User created");
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-xl space-y-4">
        <InputField label="Vorname" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("firstName", e.target.value)} />
        <InputField label="Nachname" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("lastName", e.target.value)} />
        <InputField label="Benutzername" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("username", e.target.value)} />
        <InputField label="Email" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("email", e.target.value)} />
        <InputField label="Passwort" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange("password", e.target.value)} />

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600"
        >
          Benutzer anlegen
        </button>
      </div>
    </div>
  );
}