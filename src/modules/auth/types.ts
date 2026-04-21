export type LoginPayload = {
    email: string;
    password: string;
};

export type AuthResponse = {
    accessToken: string;
    refreshToken: string;
};

export type RefreshResponse = {
    accessToken: string;
    refreshToken: string;
};
