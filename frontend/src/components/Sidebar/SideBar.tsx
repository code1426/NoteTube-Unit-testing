import { useState } from "react";

import MenuItem from "./MenuItem";
import Logout from "./Logout";
import Logo from "./AppLogo";

interface Props {
  setAuth: (value: boolean) => void;
}

const SideBar = ({ setAuth }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  return (
    <div
      className={`container flex flex-col ${isExpanded ? "w-96" : "w-28"} min-h-screen px-7 bg-gray-600 transition-all`}
    >
      <div className="flex h-40 bg-red-500 items-center justify-start">
        <Logo isExpanded={isExpanded} setIsExpanded={setIsExpanded}></Logo>
      </div>

      <div
        className={`flex h-80 flex-col bg-blue-500 items-start justify-evenly`}
      >
        <MenuItem route="/home" label="Upload Notes" isExpanded={isExpanded} />
        <MenuItem route="/decks" label="My Decks" isExpanded={isExpanded} />
        <MenuItem route="/history" label="History" isExpanded={isExpanded} />
        <MenuItem
          route="/generated-videos"
          label="Generate Videos"
          isExpanded={isExpanded}
        />
      </div>

      <div
        className={`flex flex-1 flex-col bg-violet-500 items-start justify-start pt-6`}
      >
        <Logout isExpanded={isExpanded} logout={logout} />
      </div>
    </div>
  );
};

export default SideBar;
