// components/auth/LoginCard.jsx
import LoginForm from "./LoginForm";

export default function LoginCard() {
  return (
    <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
      
      {/* Header */}
      <div className="text-center mb-6">
        <p className="text-gray-500">Welcome</p>
        <h1 className="text-2xl font-semibold mt-1">Log in</h1>
      </div>

      {/* Form */}
      <LoginForm />

      {/* Signup */}
      <p className="text-sm text-center mt-4">
        Don’t have an account?{" "}
        <span className="text-blue-600 cursor-pointer">
          Sign up here
        </span>
      </p>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300" />
        <span className="mx-3 text-gray-400 text-sm">OR</span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Google Button */}
      <button className="w-full border rounded-lg py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          alt="google"
          className="w-5 h-5"
        />
        <span className="text-gray-700">Google</span>
      </button>
    </div>
  );
}