// import { useState } from "react";
import UpdatePasswordForm from "./UpdatePasswordForm";
import { Separator } from "@/components/ui/separator";
import SwitchAccountConfirmation from "./SwitchAccountConfirmation";

import { PiPasswordBold } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  // DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AccountSettings = () => {
  return (
    <div
      id="main-container"
      className="pb-2 h-full mt-4 text-center flex justify-start"
    >
      <div id="contents" className="space-y-2 w-full h-full">
        <Separator className=" bg-gray-300" />
        <Dialog>
          <DialogTrigger asChild>
            <div
              id="change-password"
              className="w-full py-2 text-start text-md cursor-pointer hover:text-green ml-4 font-medium flex flex-row"
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

        <Separator className="my-4 bg-gray-300" />

        <div className="flex justify-start">
          <SwitchAccountConfirmation>
            <div
              id="switch-account"
              className="w-auto py-2 text-start text-md cursor-pointer hover:text-green ml-4 flex flex-row font-medium"
            >
              <HiOutlineSwitchHorizontal
                size={20}
                className="self-center mr-2"
              />
              Switch Account
            </div>
          </SwitchAccountConfirmation>
        </div>

        <Separator className="my-4 bg-gray-300" />
        <div
          id="delete-account"
          className="text-md py-2 text-start cursor-pointer hover:text-red-600 ml-4 flex flex-row font-medium"
        >
          <RiDeleteBin5Fill size={20} className="self-center mr-2" />
          Delete Account
        </div>
        <Separator className="my-4 bg-gray-300" />
      </div>
    </div>
  );
};

export default AccountSettings;
