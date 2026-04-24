import SidebarItem from "./SidebarItem";
import SidebarMenu from "./SidebarMenu"
import { Building2, LayoutDashboard, Settings, UserPlus, Users } from "lucide-react"


export default function Sidebar() {
  return (
    <SidebarMenu>
      <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard" />
      <SidebarItem icon={<UserPlus size={20} />} text="Einladungen" to="/invitations" />
      <SidebarItem icon={<Building2 size={20} />} text="Organisationen" to="/organizations" />
      <SidebarItem icon={<Users size={20} />} text="Benutzer" to="/users" />
      <hr className="my-3" />
      <SidebarItem icon={<Settings size={20} />} text="Einstellungen" to="/settings" />
    </SidebarMenu>
  );
}