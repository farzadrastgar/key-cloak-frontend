import { Outlet } from "react-router-dom";
import Topbar from "../../shared/components/navigation/Topbar";
import Sidebar from "../../shared/components/navigation/Sidebar";

export default function Layout() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Topbar full width */}
      <Topbar />

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-4 bg-gray-50 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}