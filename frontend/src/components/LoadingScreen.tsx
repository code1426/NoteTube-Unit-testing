import Spinner from "react-activity/src/Spinner/Spinner";

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <Spinner size={50} animating={true} color="#03C04A"></Spinner>
    </div>
  );
};

export default LoadingScreen;
