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
        <img src="./eye-visible.png" alt="eye" />
      ) : (
        <img src="./eye-hidden.png" alt="eye" />
      )}
    </div>
  );
};

export default EyeButton;
