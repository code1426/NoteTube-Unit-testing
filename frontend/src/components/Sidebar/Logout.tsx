import { RiLogoutBoxLine } from "react-icons/ri"; //logout

interface Props {
  logout: () => void;
  isExpanded?: boolean;
}

const Logout = ({ logout, isExpanded }: Props) => {
  return (
    <div
      className={`group flex flex-row m-auto gap-2 w-[95%] items-center justify-center transition rounded-xl ${isExpanded ? "hover:bg-red-500" : ""}`}
    >
      <div
        onClick={logout}
        className="icon flex rounded-full min-w-14 min-h-14 relative"
      >
        <RiLogoutBoxLine
          className={`text-red-600 text-2xl sm:text-2xl sm-md:3xl md:text-4xl m-auto   duration-100 ${isExpanded ? "group-hover:text-white" : "opacity-100"}`}
        />
        <span
          className={`flex item-center absolute w-auto left-full ml-6 p-2 rounded-md shadow-md text-white bg-red-500 text-xs font-bold z-50 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 ease-in-out ${isExpanded ? "opacity-0 invisible" : "opacity-100"}`}
        >
          Log Out
        </span>
      </div>
      <div
        onClick={logout}
        className={`wrapper grid transition-all duration-200 ease-in-out w-36 ${
          isExpanded ? "grid-rows-1" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`text-white group-hover:text-white font-secondaryRegular text-xl whitespace-nowrap transition-all duration-200 ease-in-out transform ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
        >
          Log Out
        </div>
      </div>
    </div>
  );
};

export default Logout;
