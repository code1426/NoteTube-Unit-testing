import { GrStatusPlaceholderSmall } from "react-icons/gr";

const LandingHeader = () => {
  const sections = ["About", "Features"];

  return (
    <div className="flex flex-row top-0 px-10 w-screen h-20 bg-white bg-opacity-70 items-center justify-between absolute">
      <div className="flex flex-row text-green text-xl font-secondaryRegular hover:text-green_hover transition-all duration-300 gap-5">
        <GrStatusPlaceholderSmall size={24} />
        NoteTube
      </div>
      <div className="hidden flex-row gap-8 sm:flex">
        {sections.map((section: string) => {
          return (
            <div className="text-green text-xl font-secondaryRegular hover:text-green_hover hover:cursor-pointer transition-all duration-300">
              {section}
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-8">
        <button className="px-8 py-2 text-xl font-secondaryRegular text-white bg-green rounded-3xl hover:bg-green_hover transition-all duration-300 text-nowrap">
          Sign Up
        </button>
        <button className="px-8 py-2 text-xl font-secondaryRegular text-green border-2 border-green rounded-3xl hover:text-green_hover hover:border-green_hover transition-all duration-300 text-nowrap">
          Log In
        </button>
      </div>
    </div>
  );
};

export default LandingHeader;
