import React from "react";

interface Props {
    title: string;
    description: string;
    enabled: boolean;
    onToggle: () => void;
}

const ToggleCard: React.FC<Props> = ({
    title,
    description,
    enabled,
    onToggle,
}) => {
    return (
        <div className="flex items-center justify-between bg-white p-5 rounded-xl shadow-sm border">
            <div className="max-w-lg">
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{description}</p>
            </div>

            {/* Toggle */}
            <button
                onClick={onToggle}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition 
          ${enabled ? "bg-indigo-600" : "bg-gray-300"}`}
            >
                <div
                    className={`bg-white w-4 h-4 rounded-full shadow transform transition 
            ${enabled ? "translate-x-5" : "translate-x-0"}`}
                />
            </button>
        </div>
    );
};

export default ToggleCard;