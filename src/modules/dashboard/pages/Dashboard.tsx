import { Building2, Search, Settings, UserPlus, Users } from "lucide-react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-20 pb-10 gap-10">
            {/* Search Bar */}
            <div className="w-full max-w-3xl flex gap-4 items-center mb-26">
                <div className="flex items-center bg-white shadow rounded-xl px-4 py-3 w-full">
                    <Search className="text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Benutzer suchen"
                        className="w-full outline-none"
                    />
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl shadow whitespace-nowrap">
                    Benutzer suchen
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl">
                <Card
                    title="Benutzer einladen"
                    Icon={UserPlus}
                    onClick={() => navigate("/invitations")}
                />
                <Card
                    title="Organisation ändern"
                    Icon={Building2}
                    onClick={() => navigate("/organizations")}
                />
                <Card
                    title="Benutzer verwalten"
                    Icon={Users}
                    onClick={() => navigate("/users")}
                />
                <Card
                    title="Globale Einstellungen"
                    Icon={Settings}
                    onClick={() => navigate("/settings")}
                />
            </div>
        </div>
    );
};

export default DashboardPage;