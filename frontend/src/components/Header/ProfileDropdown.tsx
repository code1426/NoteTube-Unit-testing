import { useContext } from "react";
import { UserContext } from "@/context/Contexts";
import ProfileButton from "../Sidebar/ProfileButton";
import LogoutConfirmation from "../Settings/LogoutConfirmation";
import UpdatePasswordForm from "../Settings/UpdatePasswordForm";
import DeleteUserForm from "../Settings/DeleteUserForm";
import { PiPasswordBold } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { LogOutIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";

const ProfileDropdown = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div></div>;
  }

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger>
            <ProfileButton />
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Profile</p>
        </TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        avoidCollisions={true}
        className="mr-8 p-2 dark:bg-dark-background dark:border-dark-border"
      >
        <DropdownMenuLabel>
          <ProfileButton isDropdown />
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-300 dark:bg-dark-border" />

        <Dialog>
          <DialogTrigger asChild>
            <button
              id="change-password"
              className="w-full cursor-pointer hover:text-green hover:dark:bg-dark-foreground hover:bg-gray-200 rounded-md flex items-center text-sm p-2"
            >
              <PiPasswordBold size={20} className="mr-2" />
              Change Password
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader />
            <UpdatePasswordForm />
          </DialogContent>
        </Dialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <button
              id="delete-account"
              className="w-full cursor-pointer hover:text-red-600 hover:dark:text-red-500 hover:dark:bg-dark-foreground hover:bg-gray-200 rounded-md flex items-center text-sm p-2"
            >
              <RiDeleteBin5Line size={20} className="mr-2" />
              Delete Account
            </button>
          </AlertDialogTrigger>
          <DeleteUserForm />
        </AlertDialog>

        <DropdownMenuSeparator className="bg-gray-300 dark:bg-dark-border" />

        <LogoutConfirmation>
          <button className="w-full cursor-pointer flex items-center hover:bg-gray-200 rounded-md p-2 hover:dark:bg-dark-foreground hover:text-red-600 hover:dark:text-red-500 text-sm">
            <LogOutIcon size={20} className="mr-2" />
            Log Out
          </button>
        </LogoutConfirmation>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileDropdown;
