import type { JSX } from "react";

const Topbar = ():JSX.Element => {
    return ( <div className="h-16 bg-gradient-to-r from-blue-400 to-purple-400 flex items-center px-6 text-white font-semibold">
      Benutzer suchen
    </div>  );
}
 
export default Topbar;