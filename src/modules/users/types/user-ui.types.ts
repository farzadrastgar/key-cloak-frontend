import type { BaseModalProps } from "../../../shared/components/ui/types/modal.types";
import type { User } from "./user.types";

export type UserMenuAction = "edit" | "delete" | "password" | "authorize";

export interface UserMenuProps {
    onSelect: (action: UserMenuAction) => void;
}

export interface MenuItemProps {
    label: string;
    onClick?: () => void;
}

export interface DeleteUserModalProps extends BaseModalProps {
    user: User;
}