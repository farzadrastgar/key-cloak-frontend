import { Outlet } from "react-router-dom";
import Topbar from "../shared/components/navigation/Topbar";
import Sidebar from "../shared/components/navigation/Sidebar";


export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Topbar full width */}
      <Topbar />

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-4 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}