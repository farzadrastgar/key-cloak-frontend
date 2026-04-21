import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


const SubSidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const isActive = (path: string) => location.pathname === path;

    const items = [
        { key: "auth", label: "Benutzer Authentifizierung", path: "/settings/auth" },
        { key: "mfa", label: "Multifaktor Authentifizierung", path: "/settings/mfa" },
    ];

    return (
        <div className="w-80 bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-semibold text-gray-800 mb-4">
                Authentifizierungs Einstellungen
            </h3>

            <div className="space-y-2">
                {items.map((item) => (
                    <button
                        key={item.key}
                        onClick={() => navigate(item.path)}
                        className={`w-full text-left px-4 py-2 rounded-lg transition
               ${isActive(item.path)
                                ? "bg-gray-200 font-medium"
                                : "hover:bg-gray-100 text-gray-600"
                            }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SubSidebar;