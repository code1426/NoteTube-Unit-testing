import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdOutlineNoteAdd } from "react-icons/md"; // upload notes
import { TbCards } from "react-icons/tb"; // my decks
import { RiHistoryLine } from "react-icons/ri"; // history
import { GoVideo } from "react-icons/go"; // generated videos

import MenuItem from "./MenuItem";
import Logout from "./Logout";
import Logo from "./AppLogo";

interface Props {
  setAuth: (value: boolean) => void;
}

const SideBar = ({ setAuth }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [currentMenu, setCurrentMenu] = useState("Upload Notes");
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    setAuth(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const routeToMenuMap: Record<string, string> = {
      "/home": "Upload Notes",
      "/decks": "My Decks",
      "/history": "History",
      "/generated-videos": "Generated Videos",
    };
    const newMenu = routeToMenuMap[location.pathname];
    if (newMenu) {
      setCurrentMenu(newMenu);
    }
  }, [location]);

  return (
    <div className="border-r-2 border-white border-solid max-h-screen relative">
      <div
        ref={sidebarRef}
        className={`container flex flex-col 
          ${isExpanded ? "w-64" : "w-24 xs:w-20 sm:w-22 lg:w-24"} 
          h-screen 
          px-3 
          sm:px-2 
          xs:px-1 
          lg:px-4
          bg-green transition-all ease-linear duration-250 -z-50 `}
      >
        <div
          className="flex items-center justify-start border-b-2 border-white 
        h-12
        md:h-16
        lg:h-24"
        >
          <Logo isExpanded={isExpanded} setIsExpanded={setIsExpanded}></Logo>
        </div>

        <div
          className={`flex h-64 md:h-80 lg:h-96 flex-col items-start justify-evenly`}
        >
          <MenuItem
            route="/home"
            label="Upload Notes"
            setCurrentMenu={setCurrentMenu}
            isExpanded={isExpanded}
            Icon={MdOutlineNoteAdd}
            currentMenu={currentMenu}
          />
          <MenuItem
            route="/decks"
            label="My Decks"
            setCurrentMenu={setCurrentMenu}
            isExpanded={isExpanded}
            Icon={TbCards}
            currentMenu={currentMenu}
          />
          <MenuItem
            route="/history"
            label="History"
            setCurrentMenu={setCurrentMenu}
            isExpanded={isExpanded}
            Icon={RiHistoryLine}
            currentMenu={currentMenu}
          />
          <MenuItem
            route="/video-generator"
            label="Video Generator"
            setCurrentMenu={setCurrentMenu}
            isExpanded={isExpanded}
            Icon={GoVideo}
            currentMenu={currentMenu}
          />
        </div>

        <div
          className={`flex flex-1 flex-col items-start justify-start pt-6 border-t-2 border-white`}
        >
          <Logout isExpanded={isExpanded} logout={logout} />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
