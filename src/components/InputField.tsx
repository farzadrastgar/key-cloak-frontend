export default function InputField({ label }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input className="w-full p-2 border rounded" />
    </div>
  );
}