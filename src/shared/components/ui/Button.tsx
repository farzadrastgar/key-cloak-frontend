import React from "react";
import type { ButtonProps, ButtonVariant } from "./types/Button.types";

const baseStyles =
    "px-5 py-2.5 rounded-xl shadow whitespace-nowrap transition font-medium";

const variants: Record<ButtonVariant, string> = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
    ghost: "bg-transparent hover:bg-gray-100 text-gray-700 shadow-none",
    danger: "bg-red-600 hover:bg-red-700 text-white",
};

export const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    type = "button",
    disabled = false,
    loading = false,
    className = "",
    variant = "primary",
}) => {
    const isDisabled = disabled || loading;

    const combinedClasses = `
    ${baseStyles}
    ${variants[variant]}
    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
    ${className}
  `;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            className={combinedClasses}
        >
            {loading ? "Loading..." : children}
        </button>
    );
};