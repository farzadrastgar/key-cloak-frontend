import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu"
import { Calendar, Layers, LayoutDashboard, Settings, StickyNote } from "lucide-react"


export default function Sidebar() {
  return (
    <aside className="w-64 h-full border-r bg-white">
      <SidebarMenu>
        <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard" />
        <SidebarItem icon={<StickyNote size={20} />} text="Invitations" to="/invitations" />
        <SidebarItem icon={<Calendar size={20} />} text="Organizations" to="/organizations" />
        <SidebarItem icon={<Layers size={20} />} text="Users" to="/users" />
        <hr className="my-3" />
        <SidebarItem icon={<Settings size={20} />} text="Settings" to="/settings/authentication" />
      </SidebarMenu>
    </aside>
  );
}