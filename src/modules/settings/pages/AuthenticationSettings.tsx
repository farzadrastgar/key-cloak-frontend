import { useEffect, useState } from "react";
import ToggleCard from "../components/ToggleCard";
import SubSidebar from "../components/SubSideBar";
import {
    getAuthSettingsRequest,
    updateAuthSettingsRequest,
} from "../api";
import type { AuthSettings } from "../types";

const AuthenticationSettingsPage = () => {
    const [settings, setSettings] = useState<AuthSettings | null>(null);
    const [loading, setLoading] = useState(true);

    // 1. fetch from server
    useEffect(() => {
        const load = async () => {
            try {
                const data = await getAuthSettingsRequest();
                setSettings(data);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    // 2. toggle with server sync
    const toggle = async (key: keyof AuthSettings) => {
        if (!settings) return;

        const updated = {
            ...settings,
            [key]: !settings[key],
        };

        // optimistic update
        setSettings(updated);

        try {
            await updateAuthSettingsRequest(updated);
        } catch (err) {
            // rollback on failure
            setSettings(settings);
        }
    };

    if (loading || !settings) {
        return <div className="p-6">Loading settings...</div>;
    }

    return (
        <>
            <h1 className="text-2xl font-semibold mb-6">
                Globale Einstellungen
            </h1>

            <div className="flex gap-8">
                <SubSidebar />

                <div className="flex-1">
                    <h2 className="text-lg font-semibold mb-4">
                        Benutzer Authentifizierung
                    </h2>

                    <div className="space-y-4">
                        <ToggleCard
                            title="Passkeys"
                            description="Login via Passkey"
                            enabled={settings.passkeys}
                            onToggle={() => toggle("passkeys")}
                        />

                        <ToggleCard
                            title="Passwort"
                            description="Password login enabled"
                            enabled={settings.password}
                            onToggle={() => toggle("password")}
                        />

                        <ToggleCard
                            title="E-Mail Passcodes"
                            description="Login via email code"
                            enabled={settings.emailPasscode}
                            onToggle={() => toggle("emailPasscode")}
                        />

                        <ToggleCard
                            title="Mobilfunknummer"
                            description="SMS code login"
                            enabled={settings.mobile}
                            onToggle={() => toggle("mobile")}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AuthenticationSettingsPage;