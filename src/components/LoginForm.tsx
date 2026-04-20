import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with:", email);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm mb-1">
          Username or email
        </label>
        <input
          type="text"
          placeholder="admin"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-700 text-white py-3 rounded-lg hover:bg-blue-800 transition"
      >
        Log in
      </button>
    </form>
  );
}