import useUser from "@/hooks/auth/useUser";
import { SidebarMenuButton } from "../ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "../ui/label";
import unfold from "@/assets/images/unfold.png";

interface Props {
  state: "expanded" | "collapsed";
  isChild?: boolean;
}

const ProfileButton = ({ state, isChild = false }: Props) => {
  const { user } = useUser();
  const username = user?.username || "Guest";
  const email = user?.email || "user@example.com";

  const getAbbreviation = (name: string) => {
    return name
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  };

  if (!user) {
    return <div className="flex flex-1 h-12 w-48"></div>;
  }

  return (
    <SidebarMenuButton
      className={`outline-none cursor-pointer min-h-12 w-52 transition-all flex items-center ${isChild && "hover:bg-white active:bg-white p-0"}`}
      variant="footer"
      size="sm"
    >
      <Avatar className="border border-gray-200">
        <AvatarFallback className="text-lg">
          {getAbbreviation(username)}
        </AvatarFallback>
      </Avatar>

      <div className="flex flex-row flex-1 justify-between items-center">
        <div
          className={`flex flex-col items-start justify-center min-h-12 flex-shrink-0 ${state === "collapsed" && "transition-all"}`}
        >
          <Label className="text-sm">{username}</Label>
          <Label className="text-xs">{email}</Label>
        </div>
        {isChild || <img className="w-4 h-5" src={unfold} alt="" />}
      </div>
    </SidebarMenuButton>
  );
};

export default ProfileButton;
