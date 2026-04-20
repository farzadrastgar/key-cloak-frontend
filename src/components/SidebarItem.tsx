import { createContext, useContext, type ReactNode } from "react";

type SidebarItemProps = {
  icon: ReactNode;
  text: string;
  active?: boolean;
  alert?: boolean;
};

export function SidebarItem({ icon, text, active, alert }: SidebarItemProps) {
  const { expanded } = useContext(SidebarContext);

  return (
    <li
      className={`
        relative flex items-center gap-2
        py-1 px-2 rounded-md cursor-pointer
        text-sm leading-tight
        transition-colors
        ${active ? "bg-indigo-100 text-indigo-700" : "text-gray-600 hover:bg-gray-100"}
      `}
    >
      <span className="w-5 h-5 flex items-center justify-center">
        {icon}
      </span>

      <span className={`${expanded ? "opacity-100" : "opacity-0 w-0"} transition-all`}>
        {text}
      </span>

      {alert && (
        <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full ml-auto" />
      )}
    </li>
  );
}