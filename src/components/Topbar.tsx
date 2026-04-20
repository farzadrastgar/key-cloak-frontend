import { useState } from "react";
import { Menu, LayoutDashboard, LogOut } from "lucide-react";

const Topbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center relative">
      {/* Title */}
      <h1 className="text-xl font-bold text-gray-800">Belzir</h1>

      {/* Menu */}
      <div className="relative">
        <button
          onClick={() => setShowDropDown((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100"
        >
          <Menu size={20} className="text-gray-700" />
        </button>

        {/* Dropdown */}
        {showDropDown && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
            <ul className="flex flex-col">

              {/* Dashboard */}
              <li>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LayoutDashboard size={18} />
                  Dashboard
                </button>
              </li>

              {/* Sign out */}
              <li>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  <LogOut size={18} />
                  Sign out
                </button>
              </li>

            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;