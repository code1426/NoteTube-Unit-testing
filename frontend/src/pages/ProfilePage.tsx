import { MdPhotoCamera } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import AccountSettings from "../components/Settings/AccountSettings";
import EditProfile from "../components/Settings/EditProfile";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const ProfilePage = () => {
  return (
    <div className="relative bg-white select-none overflow-auto scrollbar-custom h-screen">
      {/* Profile Sheet */}
      <Sheet>
        <SheetTrigger asChild>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-10 ml-10">
            Open Profile
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:w-[450px]">
          <SheetHeader>
            <SheetTitle>Profile</SheetTitle>
            <SheetDescription>
              View and manage your profile settings here.
            </SheetDescription>
          </SheetHeader>
          {/* Profile Content */}
          <div className="p-6 flex flex-col items-center">
            {/* Profile Image */}
            <div
              id="profile-image"
              className="h-44 w-44 bg-green-500 border-4 border-gray-300 rounded-full flex relative overflow-hidden"
            >
              <div className="flex self-end rounded-full bg-white w-16 h-16 justify-center items-center bg-opacity-75 absolute hover:cursor-pointer">
                <MdPhotoCamera size={40} />
              </div>
              <div className="flex self-center justify-self-center m-auto overflow-hidden text-gray-300">
                <AiOutlineUser size={200} />
              </div>
            </div>
            {/* Profile Name */}
            <div
              id="profile-name-container"
              className="w-full px-2 pt-6 flex flex-col items-center"
            >
              <div className="font-secondaryRegular text-green-700 text-5xl">
                Joshua Samenian
              </div>
              <div className="font-secondaryRegular text-green-500 text-lg">
                Joshua Mojica Samenian at gmail.com
              </div>
            </div>
            {/* Edit Profile Button */}
            <div className="mt-4">
              <Sheet>
                <SheetTrigger asChild>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Edit Profile
                  </button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-3/4">
                  <EditProfile />
                </SheetContent>
              </Sheet>
            </div>
          </div>
          {/* Account Settings */}
          <div className="w-full flex justify-center mt-8">
            <Sheet>
              <SheetTrigger asChild>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">
                  Account Settings
                </button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-3/4">
                <AccountSettings />
              </SheetContent>
            </Sheet>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ProfilePage;
