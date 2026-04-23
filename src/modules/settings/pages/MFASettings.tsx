import { useEffect, useState } from "react";
import { toast } from "sonner";
import SubSidebar from "../components/SubSideBar";
import ToggleCard from "../components/ToggleCard";
import {
    getMfaSettingsRequest,
    updateMfaSettingsRequest,
} from "../api";
import type { MFASettings } from "../types";

const MFASettingsPage = () => {
    const [settings, setSettings] = useState<MFASettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await getMfaSettingsRequest();
                setSettings(data);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    const toggle = async (key: keyof MFASettings) => {
        if (!settings) return;

        const updated = {
            ...settings,
            [key]: !settings[key],
        };

        setSettings(updated);

        try {
            await updateMfaSettingsRequest(updated);
            toast.success("MFA Einstellung gespeichert");
        } catch (err) {
            setSettings(settings);
            toast.error("Fehler beim Speichern der MFA Einstellung");
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
                        Multifaktor Authentifizierung
                    </h2>

                    <div className="space-y-4">
                        <ToggleCard
                            title="TOTP App"
                            description="Use authenticator app"
                            enabled={settings.totp}
                            onToggle={() => toggle("totp")}
                        />

                        <ToggleCard
                            title="E-Mail Code"
                            description="Email OTP fallback"
                            enabled={settings.email}
                            onToggle={() => toggle("email")}
                        />

                        <ToggleCard
                            title="SMS Code"
                            description="SMS OTP fallback"
                            enabled={settings.sms}
                            onToggle={() => toggle("sms")}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default MFASettingsPage;