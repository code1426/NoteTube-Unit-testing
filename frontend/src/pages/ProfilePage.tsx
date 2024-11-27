import { MdPhotoCamera } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { BiEdit } from "react-icons/bi";
import { AiOutlineUser } from "react-icons/ai";

//
const ProfilePage = () => {
  return (
    <div className="relative bg-white select-none overflow-auto scrollbar-custom h-screen">
      <div className="w-full mt-2 absolute h-64 px-6 z-0">
        <div
          id="background"
          className=" h-full bg-gray-300 flex flex-row-reverse"
        >
          <div className="flex self-end rounded-full bg-white w-12 h-12 justify-center items-center bg-opacity-75 m-2 hover:cursor-pointer">
            <MdPhotoCamera size={30} />
          </div>
        </div>
      </div>
      <div
        id="main-profile"
        className="min-h-40 h-auto p-6 pt-36 mx-6 flex flex-row-reverse justify-between z-10 mb-10"
      >
        <div className="flex flex-col w-auto h-auto relative m-auto">
          <div
            id="profile-image"
            className="h-44 w-44 bg-green border-4 border-gray-300 rounded-full flex m-auto flex-row-reverse overflow-hidden"
          >
            <div className="flex self-end rounded-full bg-white w-16 h-16 justify-center items-center bg-opacity-75 absolute hover:cursor-pointer">
              <MdPhotoCamera size={40} />
            </div>
            <div className="flex self-center justify-self-center m-auto overflow-hidden text-gray-300">
              <AiOutlineUser size={200} />
            </div>
          </div>
          <div
            id="profile-name-container"
            className="h-auto w-96 px-2 pt-6 flex justify-center flex-col items-center"
          >
            <div className="h-auto w-auto font-secondaryRegular text-green text-5xl">
              Joshua Samenian
            </div>
            <div className="h-auto w-autofont-secondaryRegular text-green">
              Joshua Mojica Samenian at gmail.com
            </div>
          </div>
        </div>
        <div
          id="settings"
          className="flex h-auto w-52 justify-center items-center absolute rounded-xl p-2 self-center mt-28 flex-col gap-2"
        >
          <div className="flex w-48 h-auto border-2 border-green rounded-xl p-2 hover:cursor-pointer gap-2">
            <BiEdit size={25} />
            Edit Profile
          </div>
          <div className="flex w-48 h-auto border-2 border-green rounded-xl p-2 hover:cursor-pointer gap-2">
            <IoSettingsOutline size={25} />
            Account Settings
          </div>
        </div>
      </div>
      <div
        id="sub-profile"
        className="min-h-64 mx-6 p-6 border-t-2 border-green"
      >
        <div id="decks" className="h-auto overflow-x-auto scrollbar-custom">
          <div className="h-10 p-4 text-2xl text-green font-secondaryRegular flex items-center">
            My Decks
          </div>
          <div className="flex flex-row gap-4 p-4 h-auto ">
            {/* remove this until... */}
            <div
              id="cards"
              className="border-2 border-black h-40 min-w-60 rounded-xl"
            >
              PlaceHolder
            </div>
            {/* hereee */}
          </div>
        </div>
        <div id="somethings"></div>
      </div>
    </div>
  );
};

export default ProfilePage;
