import type { JSX } from "react";

const Sidebar = () :JSX.Element=> {
  return (
    <div className="w-16 bg-white border-r flex flex-col items-center py-4 space-y-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="w-6 h-6 bg-gray-300 rounded" />
      ))}
      <div className="mt-auto w-6 h-6 bg-gray-300 rounded" />
    </div>
  );
}

 
export default Sidebar;