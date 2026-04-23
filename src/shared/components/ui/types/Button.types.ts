export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

export type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    loading?: boolean;
    className?: string;
    variant?: ButtonVariant;
};