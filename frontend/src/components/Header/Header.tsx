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
    <div
      id="supporting-container"
      className="px-3 flex w-full z-20 top-0 sticky select-none 
      4k:h-24  md:
      xl:h-24  
      lg:h-24
      md:h-16 
      h-12 
      bg-white "
    >
      <div
        id="main-container"
        className="flex flex-row px-10 w-full border-b-2  border-green bg-white items-center justify-between"
      >
        <div className="text-black text-responsive font-primaryBold flex items-center justify-center">
          {isHomePage ? (
            `Welcome ${username}!`
          ) : (
            <button
              className="hover:bg-gray-200 rounded-full text-responsive m-auto"
              onClick={handleBack}
            >
              <PiArrowCircleLeftBold
                className="m-auto
              text-4xl 
              sm:text-4xl
              sm-md:5xl 
              md:text-5xl
              lg:text-6xl"
              />
            </button>
          )}
        </div>

        <div className="text-responsive">
          <Link to="/profile">
            <button className="hover:bg-gray-200 rounded-full text-responsive flex m-auto">
              <PiUserCircleFill
                className="
              text-4xl 
              sm:text-4xl
              sm-md:5xl 
              md:text-5xl
              lg:text-6xl "
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
