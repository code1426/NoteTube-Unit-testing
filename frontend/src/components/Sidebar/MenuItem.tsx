import { Link } from "react-router-dom";

interface Props {
  route: string;
  label: string;
  icon?: string;
  isExpanded: boolean;
}

const MenuItem = ({ route, label, isExpanded }: Props) => {
  return (
    <Link to={route}>
      <div className=" flex flex-row gap-4 items-center justify-center bg-black">
        <div className="icon flex rounded-full bg-white min-w-14 min-h-14"></div>
        <div className={`${isExpanded || "hidden"} text-white text-xl`}>
          {label}
        </div>
      </div>
    </Link>
  );
};

export default MenuItem;
