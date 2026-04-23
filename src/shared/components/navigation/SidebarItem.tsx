import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  to: string;
  alert?: boolean;
};

export default function SidebarItem({
  icon,
  text,
  to,
  alert,
}: SidebarItemProps) {
  return (
    <NavLink
      to={to}
      end={to === "/dashboard"}
      className={({ isActive }) =>
        `
        relative flex items-center gap-2
        py-2 px-3 rounded-md text-sm
        transition-colors

        ${isActive
          ? "bg-indigo-100 text-indigo-700 font-medium"
          : "text-gray-600 hover:bg-gray-100"
        }
        `
      }
    >
      <span className="w-5 h-5 flex items-center justify-center">
        {icon}
      </span>

      <span className="truncate">{text}</span>

      {alert && (
        <span className="ml-auto w-2 h-2 rounded-full bg-indigo-400" />
      )}
    </NavLink>
  );
}