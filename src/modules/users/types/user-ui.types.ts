export type UserMenuAction = "edit" | "delete" | "password" | "authorize";

export interface UserMenuProps {
    onSelect: (action: UserMenuAction) => void;
}

export interface MenuItemProps {
    label: string;
    onClick?: () => void;
}