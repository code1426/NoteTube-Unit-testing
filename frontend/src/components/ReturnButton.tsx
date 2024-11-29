import { useNavigate } from "react-router-dom";
import { PiKeyReturn } from "react-icons/pi";

const ReturnButton = () => {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <div className="w-full flex justify-end items-center">
      <button onClick={handleBack} className="text-1xl">
        <PiKeyReturn size={45} className="hover:bg-gray-200 rounded-full" />{" "}
        Return
      </button>
    </div>
  );
};

export default ReturnButton;
