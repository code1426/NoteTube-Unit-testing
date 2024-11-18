interface Props {
  setIsExpanded: (value: boolean) => void;
  isExpanded: boolean;
}
const Logo = ({ setIsExpanded, isExpanded }: Props) => {
  return (
    <div className=" flex flex-row gap-2 items-center justify-center">
      <div
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className="icon flex rounded-full bg-white w-14 h-14"
      ></div>
      <div
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
        className={`${isExpanded || "hidden"} text-white text-3xl`}
      >
        NoteTube
      </div>
    </div>
  );
};

export default Logo;
