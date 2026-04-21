export type AuthSettings = {
    password: boolean;
    passkeys: boolean;
    emailPasscode: boolean;
    mobile: boolean;
};

export type MFASettings = {
    totp: boolean;
    email: boolean;
    sms: boolean;
};