import { PiArrowCircleLeftBold, PiUserCircleFill } from "react-icons/pi";

interface HeaderProps {
  isHomePage: boolean;
}

const Header = ({ isHomePage }: HeaderProps) => {
  const handleBack = () => {
    return null;
  };

  return (
    <div>
      <div className="header-top w-full px-4 py-6 bg-white flex justify-between items-center">
        <div className="text-black text-4xl md:text-6xl lg:text-6xl font-primaryBold">
          {isHomePage ? (
            "Welcome User!"
          ) : (
            <button onClick={handleBack}>
              {" "}
              <PiArrowCircleLeftBold size={60} />{" "}
            </button>
          )}
        </div>
        <div>
          <button className="hover:bg-gray-200 rounded">
            <PiUserCircleFill size={60} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
