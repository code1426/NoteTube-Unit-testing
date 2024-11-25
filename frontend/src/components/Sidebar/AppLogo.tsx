import { FcVideoFile } from "react-icons/fc"; //placeholder

interface Props {
  setIsExpanded: (value: boolean) => void;
  isExpanded: boolean;
}
const Logo = ({ setIsExpanded, isExpanded }: Props) => {
  return (
    <div className=" flex flex-row gap-2 items-center justify-center p-2 select-none">
      <div
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className="group icon flex rounded-full w-14 h-14 relative border-2 border-black border-solid"
      >
        <FcVideoFile className="text-4xl text-black m-auto" />
        <span
          className={`flex item-center absolute w-auto left-full ml-4 p-2 rounded-md shadow-md text-white bg-green text-xs font-bold z-50 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-100 ease-in-out ${isExpanded ? "opacity-0 invisible" : "opacity-100"}`}
        >
          Notetube
        </span>
      </div>
      <div
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className={`wrapper grid transition-all duration-300 ease-in-out ${
          isExpanded ? "grid-rows-1" : "grid-rows-[0fr]"
        }`}
      >
        <div
          className={`text-green font-secondaryRegular text-3xl whitespace-nowrap ml-4 transition-all duration-300 ease-in-out transform ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"}`}
        >
          NoteTube
        </div>
      </div>
    </div>
  );
};

export default Logo;
