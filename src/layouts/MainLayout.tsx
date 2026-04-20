// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}