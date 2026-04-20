import InputField from "./InputField";

export default function UserForm() {
  return (
    <div className="flex-1 p-8">
      <div className="max-w-xl space-y-4">
        <InputField label="Vorname" />
        <InputField label="Nachname" />
        <InputField label="Benutzername" />
        <InputField label="Email" />
        <InputField label="Telefonnummer" />

        <div className="border rounded p-4 text-gray-500">
          <div className="flex justify-between items-center">
            <span>Organisation wechseln</span>
            <span className="text-lg">+</span>
          </div>
          <p className="text-xs mt-2">
            Hier klicken zum Suchen, Auswählen oder Ziehen der Organisationen aus dem Baum!
          </p>
        </div>

        <button className="bg-blue-500 text-white px-6 py-2 rounded shadow hover:bg-blue-600">
          Benutzer anlegen
        </button>
      </div>
    </div>
  );
}