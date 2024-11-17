interface Props {
  logout: () => void;
  isExpanded?: boolean;
}

const Logout = ({ logout, isExpanded }: Props) => {
  return (
    <div className=" flex flex-row gap-4 items-center justify-center bg-black">
      <div onClick={logout} className="icon flex rounded-full bg-white min-w-14 min-h-14"></div>
      <div onClick={logout} className={`${isExpanded || "hidden"} text-white text-xl`}>
        Logout
      </div>
    </div>
  );
};

export default Logout;
