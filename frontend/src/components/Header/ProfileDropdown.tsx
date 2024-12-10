import { useContext } from "react";
import { UserContext } from "@/context/Contexts";
import ProfileButton from "../Sidebar/ProfileButton";
import LogoutConfirmation from "../LogoutConfirmation";
import UpdatePasswordForm from "../Settings/UpdatePasswordForm";
import { Separator } from "@/components/ui/separator";
import SwitchAccountConfirmation from "../Settings/SwitchAccountConfirmation";

import { PiPasswordBold } from "react-icons/pi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
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
import { BiNotification } from "react-icons/bi";
import { LogOutIcon } from "lucide-react";

const ProfileDropdown = () => {
  const { user } = useContext(UserContext);
  if (!user) {
    return <div></div>;
  }

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

          <DropdownMenuSeparator className=" bg-gray-300" />

          <div className="p-2">
            <div className="w-full cursor-pointer hover:text-green flex flex-row text-sm  py-3">
              <BiNotification size={20} className="self-center mr-2" />
              <span>Notification</span>
            </div>

            <Separator className=" bg-gray-300" />
            {/*  */}
            <Dialog>
              <DialogTrigger asChild>
                <div
                  id="change-password"
                  className="w-full cursor-pointer hover:text-green flex flex-row text-sm pt-3 pb-2"
                >
                  <PiPasswordBold size={20} className="self-center mr-2" />
                  Change Password
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader></DialogHeader>
                <UpdatePasswordForm />
              </DialogContent>
            </Dialog>

            <DropdownMenuSeparator className=" bg-gray-300" />

            {/*  */}
            <div className=" flex items-center">
              <SwitchAccountConfirmation>
                <div
                  id="switch-account"
                  className="w-full cursor-pointer hover:text-green flex flex-row text-sm pt-2 pb-3"
                >
                  <HiOutlineSwitchHorizontal
                    size={20}
                    className="self-center mr-2"
                  />
                  Switch Account
                </div>
              </SwitchAccountConfirmation>
            </div>

            <Separator className=" bg-gray-300" />
            {/*  */}
            <div
              id="delete-account"
              className="w-full cursor-pointer hover:text-red-600 flex flex-row text-sm  py-3"
            >
              <RiDeleteBin5Line size={20} className="self-center mr-2" />
              <span>Delete Account</span>
            </div>

            <Separator className=" bg-gray-300" />

            <div
              onClick={(e) => e.preventDefault()}
              className="flex pt-6 px-4 items-end justify-end"
            >
              <LogoutConfirmation>
                <div className="w-full cursor-pointer hover:text-red-600 flex flex-row text-sm  py-3">
                  <span>Log Out</span>
                  <LogOutIcon size={20} className="self-center ml-2" />
                </div>
              </LogoutConfirmation>
            </div>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ProfileDropdown;
