import type { InputProps } from "./types/modal.types";


export default function InputField({
  label,
  ...props
}: InputProps) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input className="w-full p-2 border rounded" {...props} />
    </div>
  );
}