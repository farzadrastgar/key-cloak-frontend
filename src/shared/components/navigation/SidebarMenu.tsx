import { ChevronFirst, ChevronLast } from "lucide-react";
import { useState, type ReactNode } from "react";

type SidebarMenuProps = {
    children: ReactNode;
};

export default function SidebarMenu({ children }: SidebarMenuProps) {
    const [expanded, setExpanded] = useState(true);

    return (
        <aside className={`h-screen transition-all ${expanded ? "w-64" : "w-16"}`}>
            <nav className="h-full flex flex-col bg-white border-r shadow-sm overflow-hidden">
                <div className="p-4 pb-2 flex justify-between items-center">
                    <button
                        onClick={() => setExpanded(curr => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <ul className="flex-1 px-3">
                    {children}
                </ul>
            </nav>
        </aside>
    );
}