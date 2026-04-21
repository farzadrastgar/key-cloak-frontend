import { useState } from "react";
import SubSidebar from "../components/SubSideBar";
import ToggleCard from "../components/ToggleCard";

const MFASettingsPage = () => {

    const [settings, setSettings] = useState({
        totp: false,
        email: false,
        phone: false,
    });

    const toggle = (key: keyof typeof settings) => {
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            <h1 className="text-2xl font-semibold mb-6">
                Globale Einstellungen
            </h1>

            <div className="flex gap-8">
                {/* LEFT PANEL */}
                <SubSidebar />

                {/* RIGHT CONTENT */}
                <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-4">
                        Multifaktor Authentifizierung
                    </h2>

                    <div className="space-y-4">
                        <ToggleCard
                            title="Einmalpasswörter (TOTP-App)"
                            description="Nutzer können eine TOTP-App per QR-Code registrieren und den Code als zweiten Faktor nutzen."
                            enabled={settings.totp}
                            onToggle={() => toggle("totp")}
                        />

                        <ToggleCard
                            title="E-Mail Passcodes"
                            description="Falls keine TOTP-App registriert ist, erhält der Nutzer einen Passcode per E-Mail."
                            enabled={settings.email}
                            onToggle={() => toggle("email")}
                        />

                        <ToggleCard
                            title="Mobilfunknummer"
                            description="Falls keine TOTP-App registriert ist, erhält der Nutzer einen Passcode per SMS."
                            enabled={settings.phone}
                            onToggle={() => toggle("phone")}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MFASettingsPage;