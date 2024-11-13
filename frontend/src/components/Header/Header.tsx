import { PiArrowCircleLeftBold, PiUserCircleFill } from "react-icons/pi";

interface HeaderProps {
  isHomePage: boolean;
}

const Header = ({ isHomePage }: HeaderProps) => {
  const handleBack = () => {
    return null;
  };

  return (
    <div className="flex flex-row top-0 px-10 w-full h-20 bg-white items-center justify-between z-10 sticky">
      <div className="text-black text-4xl font-primaryBold">
        {isHomePage ? (
          "Welcome User!"
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
        <button className="hover:bg-gray-200 rounded-full">
          <PiUserCircleFill size={60} />
        </button>
      </div>
    </div>
  );
};

export default Header;
