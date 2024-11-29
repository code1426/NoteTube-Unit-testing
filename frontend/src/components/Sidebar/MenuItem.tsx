import { Link } from "react-router-dom";

interface Props {
  route: string;
  label: string;
  isExpanded: boolean;
  Icon: React.ElementType;
  className?: string;
  currentMenu: string;
  setCurrentMenu: (value: string) => void;
}

const MenuItem = ({
  route,
  label,
  isExpanded,
  Icon,
  setCurrentMenu,
  currentMenu,
}: Props) => {
  return (
    <Link to={route}>
      <div
        onClick={() => setCurrentMenu(label)}
        id="background"
        className={`group flex flex-row items-center p-2 transition rounded-xl ${isExpanded ? "hover:bg-white" : ""} ${currentMenu === label ? "bg-white" : ""}`}
      >
        <div className="flex flex-row">
          <div className="icon flex item-center justify-center rounded-full w-14 h-14 relative">
            <Icon
              className={`text-4xl m-auto transition-colors duration-100
                ${
                  isExpanded
                    ? currentMenu === label
                      ? "text-green"
                      : "text-white group-hover:text-green"
                    : currentMenu === label
                      ? "text-green"
                      : "text-white"
                }`}
            />
            <span
              className={`absolute left-full ml-6 p-2 rounded-md shadow-md text-white bg-green text-xs font-bold z-10 scale-0 i wagroup-hover:opacity-100 group-hover:scale-100 transition-all duration-100 ease-in-out transform ${isExpanded ? "opacity-0 invisible" : "opacity-100"}`}
            >
              {label}
            </span>
          </div>
          <div
            className={`wrapper grid transition-all duration-300 ease-in-out self-center w-48 px-1 ${
              isExpanded ? "grid-rows-1" : "grid-rows-[0fr]"
            }`}
          >
            <div
              className={` font-secondaryRegular text-xl whitespace-nowrap transition-all duration-200 ease-in-out transform
                    ${
                      isExpanded
                        ? currentMenu === label
                          ? "text-green opacity-100 translate-x-0"
                          : "text-white opacity-100 translate-x-0 group-hover:text-green"
                        : currentMenu === label
                          ? "opacity-0 pointer-events-none"
                          : "opacity-0 -translate-x-3 pointer-events-none"
                    }`}
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
