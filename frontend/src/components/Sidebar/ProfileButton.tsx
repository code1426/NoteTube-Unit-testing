import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "../ui/label";
import { UserContext } from "@/context/Contexts";
import { useContext } from "react";
import EditProfile from "../Settings/EditProfile";

interface Props {
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

  if (!user) return <div></div>;

  return (
    <div
      className={`outline-none cursor-pointer  gap-2 p-1 rounded-full transition-all flex flex-col justify-center items-center ${isDropdown && "hover:bg-white min-w-44 w-60 active:bg-white p-0"}`}
    >
      <Avatar className={` ${isDropdown && "w-20 h-20 border-2 border-green"}`}>
        <AvatarFallback className={`text-xl ${isDropdown && "text-5xl"}`}>
          {getAbbreviation(user!.username)}
        </AvatarFallback>
      </Avatar>

      {isDropdown && (
        <div className="flex flex-col flex-1 justify-center items-center">
          <div
            className={`flex flex-row items-center justify-center min-h-12 flex-shrink-0 transition-all`}
          >
            <div className=" flex-row items-center justify-center block w-full truncate max-w-44">
              <Label className="text-lg">{user?.username}</Label>
            </div>
            <div className="ml-2 right-0">
              <EditProfile />
            </div>
          </div>
          <Label className="text-xs">{user?.email}</Label>
        </div>
      )}
    </div>
  );
};

export default ProfileButton;
