import { Link } from "react-router-dom";

interface Props {
  route: string;
  label: string;
  icon?: string;
  isExpanded: boolean;
  className?: string;
}

const MenuItem = ({ route, label, isExpanded }: Props) => {
  return (
    <Link to={route}>
      <div
        id="background"
        className={`group flex flex-row items-center p-2 transition duration-100 rounded-xl ${isExpanded ? "hover:bg-green" : ""}`}
      >
        <div className="flex flex-row">
          <div className="icon flex item-center justify-center rounded-full bg-gray-700 w-14 h-14 relative">
            <span
              className={`absolute left-full ml-4 p-2 rounded-md shadow-md text-white bg-green text-xs font-bold z-50 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 ease-in-out transform ${isExpanded ? "opacity-0 invisible" : "opacity-100"}`}
            >
              {label}
            </span>
          </div>
          <div
            className={`wrapper grid transition-all duration-300 ease-in-out self-center w-40 px-4 ${
              isExpanded ? "grid-rows-1" : "grid-rows-[0fr]"
            }`}
          >
            <div
              className={`text-green font-secondaryRegular text-xl whitespace-nowrap transition-all duration-300 ease-in-out transform group-hover:text-white ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-nones"}`}
            >
              {label}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
