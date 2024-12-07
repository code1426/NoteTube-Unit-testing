import ProfileButton from "../Sidebar/ProfileButton";
import LogoutConfirmation from "../LogoutConfirmation";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import { BiNotification } from "react-icons/bi";
import { Edit2Icon } from "lucide-react";
import { LogOutIcon } from "lucide-react";
import { Settings } from "lucide-react";

const ProfileDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ProfileButton />
      </DropdownMenuTrigger>
      <DropdownMenuContent avoidCollisions={true} className="mr-10">
        <DropdownMenuLabel>
          <ProfileButton isDropdown />
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Edit2Icon />
          <span>Edit Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings />
          <span>Account Settings</span>
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
  );
};

export default ProfileDropdown;
