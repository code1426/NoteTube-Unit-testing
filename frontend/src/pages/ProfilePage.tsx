import { useState, useEffect } from "react";
import { MdPhotoCamera } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import AccountSettings from "../components/Settings/AccountSettings";
import EditProfile from "../components/Settings/EditProfile";
import useUser from "@/hooks/auth/useUser";
import useUpdateUsername from "@/hooks/User/useUpdateUsername";

const ProfilePage = () => {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAccountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const { user } = useUser();
  const { newUsername } = useUpdateUsername();
  const [username, setUsername] = useState(user?.username || "");

  const handleUpdateUsername = async () => {
    console.log("click");
    const result = await newUsername(user!);

    if (result.success) {
      setUsername(result.user!.username);
      console.log("newname", result.user!.username);
    } else {
      console.error("Failed to update username:", result.error);
    }
  };

  useEffect(() => {
    if (user && !username) {
      setUsername(user.username);
    }
  }, [user, username]);

  return (
    <div className="relative bg-white select-none overflow-auto scrollbar-custom h-screen">
      {/* Background Cover */}
      <div className="w-full absolute h-64 px-6 z-0">
        <div
          id="background"
          className="h-full bg-gray-300 flex flex-row-reverse"
        >
          <div className="flex self-end rounded-full bg-white w-12 h-12 justify-center items-center bg-opacity-75 m-2 hover:cursor-pointer">
            <MdPhotoCamera size={30} />
          </div>
        </div>
      </div>

      {/* Profile Section */}
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
            <div
              className="h-auto w-auto font-secondaryRegular text-green text-5xl"
              onClick={handleUpdateUsername}
            >
              {username || "Loading..."}{" "}
              {/* Display "Loading..." if username isn't set */}
            </div>
            <div className="h-auto w-auto font-secondaryRegular text-green">
              Joshua Mojica Samenian at gmail.com
            </div>
          </div>
        </div>
      </div>

      {/* Sub Profile Section */}
      <div
        id="sub-profile"
        className="h-auto mx-6 flex flex-row mb-4 justify-center"
      >
        {/* Edit Profile */}
        <div id="settings" className="w-1/2 h-full flex justify-evenly">
          <div className="mx-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              onClick={() => setEditProfileOpen(true)}
            >
              Edit Profile
            </button>
            {isEditProfileOpen && (
              <EditProfile onClose={() => setEditProfileOpen(false)} />
            )}
          </div>
          <div className="mx-2">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              onClick={() => setAccountSettingsOpen(true)}
            >
              Account Settings
            </button>
            {isAccountSettingsOpen && (
              <AccountSettings onClose={() => setAccountSettingsOpen(false)} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
