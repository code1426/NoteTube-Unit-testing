import { PiArrowCircleLeftBold, PiUserCircleFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";

interface HeaderProps {
  isHomePage: boolean;
  username?: string | undefined;
}

const Header = ({ isHomePage, username }: HeaderProps) => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="px-3 h-24 flex w-full z-20 top-0 sticky select-none">
      <div className="flex flex-row px-10 w-full border-b-2  border-green bg-white items-center justify-between">
        <div className="text-black text-4xl font-primaryBold">
          {isHomePage ? (
            `Welcome ${username}!`
          ) : (
            <button
              className="hover:bg-gray-200 rounded-full"
              onClick={handleBack}
            >
              <PiArrowCircleLeftBold size={60} />
            </button>
          )}
        </div>

        <div>
          <Link to="/profile">
            <button className="hover:bg-gray-200 rounded-full">
              <PiUserCircleFill size={60} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
