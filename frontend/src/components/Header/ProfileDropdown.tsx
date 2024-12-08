import { useState, useContext } from "react";
import { UserContext } from "@/context/Contexts";
import ProfileButton from "../Sidebar/ProfileButton";
import LogoutConfirmation from "../LogoutConfirmation";
import EditProfile from "../Settings/EditProfile";
import AccountSettings from "../Settings/AccountSettings";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "../ui/label";

import { BiNotification } from "react-icons/bi";
// import { Edit2Icon } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { Settings } from "lucide-react";
import LoadingScreen from "../LoadingScreen";

const ProfileDropdown = () => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { user } = useContext(UserContext);
  if (!user) {
    return <LoadingScreen message="Loading page..." />;
  }

  const getAbbreviation = (name: string) => {
    return name
      .split(" ")
      .map((name) => name[0].toUpperCase())
      .join("");
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <ProfileButton />
        </DropdownMenuTrigger>

        <DropdownMenuContent avoidCollisions={true} className="mr-10">
          <DropdownMenuLabel>
            <ProfileButton isDropdown />
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setProfileOpen(true)}
            className="flex items-center gap-2"
          >
            <Settings />
            <span>Profile Settings</span>
          </DropdownMenuItem>

          <DropdownMenuItem>
            <BiNotification />
            <span>Notification</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={(e) => e.preventDefault()}
            className="flex items-center"
          >
            <LogoutConfirmation>
              <div className="flex flex-1 gap-2">
                <LogOutIcon className="p-1" />
                <span>Log Out</span>
              </div>
            </LogoutConfirmation>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Sheet open={isProfileOpen} onOpenChange={setProfileOpen}>
        <SheetContent side="right" className="w-full sm:w-[450px]">
          <SheetHeader>
            <SheetTitle className="font-bold text-2xl">
              Profile Settings
            </SheetTitle>
            <SheetDescription>
              Manage your profile and account settings here.
            </SheetDescription>
          </SheetHeader>
          <Separator className="my-4 bg-gray-400" />
          <div className=" overflow-atuo">
            {/* contents */}
            <div className="flex flex-row items-center">
              <div
                id="profile-image"
                className="h-20 w-20 border-4 border-green rounded-full overflow-hidden flex bg-gray-100"
              >
                {/* <div className="flex self-end rounded-full bg-white w-16 h-16 justify-center items-center bg-opacity-75 absolute hover:cursor-pointer">
                <BiNotification size={40} />
              </div> */}
                <div className="flex m-auto">
                  <Avatar className="h-full w-full">
                    <AvatarFallback className="text-5xl font-secondaryRegular bg-gray-100">
                      {getAbbreviation(user!.username)}
                    </AvatarFallback>
                  </Avatar>
                </div>
              </div>
              <div className="font-secondaryRegular text-green-700  truncate block text-ellipsis max-w-44 ml-2">
                <Label className="text-2xl">{user?.username}</Label>
              </div>

              <div>
                <EditProfile />
              </div>
            </div>
            <Separator className="my-4 bg-gray-400" />
            <div className="mt-6 px-4">
              <h1 className="text-xl font-semibold text-black">
                Account Settings
              </h1>
              <AccountSettings />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default ProfileDropdown;
