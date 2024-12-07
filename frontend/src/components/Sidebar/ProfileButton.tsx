import { SidebarMenuButton } from "../ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "../ui/label";
import unfold from "@/assets/images/unfold.png";

import { UserContext } from "@/context/Contexts";
import { useContext } from "react";

interface Props {
  state: "expanded" | "collapsed";
  isChild?: boolean;
}

const ProfileButton = ({ state, isChild = false }: Props) => {
  const { user } = useContext(UserContext);

  const getAbbreviation = (name: string) => {
    return name
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  };

  return (
    <SidebarMenuButton
      className={`outline-none cursor-pointer mr-2   min-h-12 transition-all flex items-center ${isChild && "hover:bg-white active:bg-white p-0"}`}
      variant="footer"
      size="sm"
    >
      <Avatar className="border border-gray-200">
        <AvatarFallback className="text-lg">
          {getAbbreviation(user!.username)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-row flex-1 justify-between items-center">
        <div
          className={`flex flex-col items-start justify-center min-h-12 flex-shrink-0 ${state === "collapsed" && "transition-all"}`}
        >
          <Label className="text-sm">{user?.username}</Label>
          <Label className="text-xs">{user?.email}</Label>
        </div>
        {isChild || <img className="w-4 h-5" src={unfold} alt="" />}
      </div>
    </SidebarMenuButton>
  );
};

export default ProfileButton;
