import { PiUserCircleFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import useUser from "@/hooks/auth/useUser";

interface ProfileButtonProps {
  isExpanded?: boolean;
}

const ProfileButton = ({ isExpanded }: ProfileButtonProps) => {
  const { user } = useUser();
  const username = user?.username || "Guest";

  return (
    <div className={`group mt-4 mb-4 ${isExpanded ? "w-auto" : "w-12"}`}>
      <Link to="/profile" className="flex items-center">
        <button
          className={`hover:bg-green_hover w-auto h-auto rounded-full text-responsive flex items-center px-4 sm:px-2 md:px-1`}
        >
          <PiUserCircleFill className="text-white text-6xl sm:text-5xl sm-md:5xl md:text-6xl" />
        </button>
        <div
          className={`text-white transition-all duration-200 ease-in-out transform whitespace-nowrap ${
            isExpanded
              ? "opacity-100 translate-x-3 pointer-events-auto"
              : "opacity-0 -translate-x-3 pointer-events-none"
          }`}
        >
          <div className="font-secondaryRegular text-xl block truncate max-w-28">
            {username}
            {/* {userEmail} */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProfileButton;
