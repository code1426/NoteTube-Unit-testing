// import useUser from "@/hooks/auth/useUser";
import { SidebarMenuButton } from "../ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Label } from "../ui/label";
import unfold from "@/assets/images/unfold.png";

interface Props {
  state: "expanded" | "collapsed";
  isChild?: boolean;
}

const ProfileButton = ({ state, isChild = false }: Props) => {
  // const { user } = useUser();
  // const username = user?.username || "Guest";

  return (
    <SidebarMenuButton
      className={`min-h-12 transition-all flex items-center ${isChild && "hover:bg-white active:bg-white p-0"}`}
      variant="footer"
      size="sm"
    >
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex flex-row flex-1 justify-between items-center">
        <div
          className={`flex flex-col items-start justify-center min-h-12 flex-shrink-0 ${state === "collapsed" && "transition-all"}`}
        >
          <Label className="text-sm">Kimly John Vergara</Label>
          <Label className="text-xs">gmver27@gmail.com</Label>
        </div>
        {isChild || <img className="w-4 h-5" src={unfold} alt="" />}
      </div>
    </SidebarMenuButton>
  );
};

export default ProfileButton;
