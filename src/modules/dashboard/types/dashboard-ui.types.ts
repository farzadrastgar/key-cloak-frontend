import type { LucideIcon } from "lucide-react";

export type CardProps = {
    title: string;
    Icon: LucideIcon;
    onClick?: () => void;
};