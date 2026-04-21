import api from "../../services/apiClient";
import type { AuthSettings, MFASettings } from "./types";


export const getAuthSettingsRequest = async () => {
    const { data } = await api.get<AuthSettings>("/settings/auth");
    return data;
};

export const updateAuthSettingsRequest = async (payload: AuthSettings) => {
    const { data } = await api.put<AuthSettings>("/settings/auth", payload);
    return data;
};

// MFA SETTINGS

export const getMfaSettingsRequest = async () => {
    const { data } = await api.get<MFASettings>("/settings/mfa");
    return data;
};

export const updateMfaSettingsRequest = async (payload: MFASettings) => {
    const { data } = await api.put<MFASettings>("/settings/mfa", payload);
    return data;
};