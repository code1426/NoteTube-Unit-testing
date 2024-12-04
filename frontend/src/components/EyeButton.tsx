import eyeVisible from "@/assets/images/eye-visible.png";
import eyeHidden from "@/assets/images/eye-hidden.png";

interface Props {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
}

const EyeButton = ({ isVisible, setIsVisible }: Props) => {
  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div
      className="w-7 h-7 p-1 rounded-full hover:bg-gray-100 transition-all"
      onClick={handleToggle}
    >
      {isVisible ? (
        <img src={eyeVisible} alt="eye" />
      ) : (
        <img src={eyeHidden} alt="eye" />
      )}
    </div>
  );
};

export default EyeButton;
