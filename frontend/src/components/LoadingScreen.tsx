import Spinner from "react-activity/src/Spinner/Spinner";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  message = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <Spinner size={50} animating={true} color="#03C04A"></Spinner>
      <p className="text-xl text-gray-600 mt-4">{message}</p>
    </div>
  );
};

export default LoadingScreen;
