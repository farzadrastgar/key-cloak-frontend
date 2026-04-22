import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import type { UserMenuProps, MenuItemProps, UserMenuAction } from "../types/user-ui.types";

export default function UserMenu({ onSelect }: UserMenuProps) {
    const [open, setOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleSelect = (action: UserMenuAction) => {
        setOpen(false); // close menu after click
        onSelect(action);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={menuRef} className="relative">
            <button onClick={() => setOpen(!open)}>
                <MoreVertical className="w-5 h-5" />
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg  border z-50">
                    <MenuItem label="Benutzer bearbeiten" onClick={() => handleSelect("edit")} />
                    <MenuItem label="Benutzer löschen" onClick={() => handleSelect("delete")} />
                    <MenuItem label="Passwort zurücksetzen" onClick={() => handleSelect("password")} />
                    <MenuItem label="Autorisierung" onClick={() => handleSelect("authorize")} />

                </div>
            )}
        </div>
    );
}

function MenuItem({ label, onClick }: MenuItemProps) {
    return (
        <button
            onClick={onClick}
            className="block w-full text-left px-4 py-2 text-sm
                cursor-pointer
                transition-colors duration-150
                hover:bg-gray-100
                hover:text-blue-600
                active:bg-gray-200"
        >
            {label}
        </button>
    );
}