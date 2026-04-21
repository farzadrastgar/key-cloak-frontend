import { useState } from "react";

import ToggleCard from "../components/ToggleCard";
import SubSidebar from "../components/SubSideBar";

const AuthenticationSettingsPage = () => {

    const [settings, setSettings] = useState({
        passkeys: false,
        password: true,
        email: false,
        phone: false,
    });

    const toggle = (key: keyof typeof settings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            <h1 className="text-2xl font-semibold mb-6">Globale Einstellungen</h1>
            <div className="flex gap-8">
                {/* LEFT PANEL */}
                <SubSidebar />
                <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-4">
                        Benutzer Authentifizierung
                    </h2>
                    <div className="space-y-4">

                        <ToggleCard
                            title="Passkeys"
                            description="Nutzer können sich mit einem Passkey anmelden."
                            enabled={settings.passkeys}
                            onToggle={() => toggle("passkeys")}
                        />

                        <ToggleCard
                            title="Passwort"
                            description="Login mit Passwort ist möglich."
                            enabled={settings.password}
                            onToggle={() => toggle("password")}
                        />

                        <ToggleCard
                            title="E-Mail Passcodes"
                            description="Passcode per E-Mail."
                            enabled={settings.email}
                            onToggle={() => toggle("email")}
                        />

                        <ToggleCard
                            title="Mobilfunknummer"
                            description="Passcode per SMS."
                            enabled={settings.phone}
                            onToggle={() => toggle("phone")}
                        />
                    </div>
                </div>
            </div>

        </>
    );
};

export default AuthenticationSettingsPage;