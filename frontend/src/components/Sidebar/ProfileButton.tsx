import { SidebarMenuButton } from "../ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "../ui/label";
import unfold from "@/assets/images/unfold.png";

import { UserContext } from "@/context/Contexts";
import { useContext } from "react";

interface Props {
  // state: "expanded" | "collapsed";
  isDropdown?: boolean;
}

const ProfileButton = ({ isDropdown = false }: Props) => {
  const { user } = useContext(UserContext);

  const getAbbreviation = (name: string) => {
    return name
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  };

  return (
    <div
      className={`outline-none cursor-pointer gap-2 p-1 rounded-full transition-all flex items-center ${isDropdown && "hover:bg-white active:bg-white p-0"}`}
    >
      <Avatar className="border ml-[-8px] border-gray-300">
        <AvatarFallback className="text-lg">
          {getAbbreviation(user!.username)}
        </AvatarFallback>
      </Avatar>

      {isDropdown && (
        <div className="flex flex-row flex-1 justify-between items-center">
          <div
            className={`flex flex-col items-start justify-center min-h-12 flex-shrink-0 transition-all `}
          >
            <Label className="text-sm">{user?.username}</Label>
            <Label className="text-xs">{user?.email}</Label>
          </div>
          {/* <img className="w-4 h-5" src={unfold} alt="" /> */}
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
