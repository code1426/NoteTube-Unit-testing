import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-grow flex-col min-h-screen p-8 items-center justify-center gap-12 bg-white bg-opacity-70 select-none">
      <div className="text-green font-secondaryRegular text-center">
        <div className="text-8xl">NoteTube</div>
        <div className="text-xl">Your AI-Powered Study Companion</div>
      </div>
      <Link to="/register">
        <button className="px-12 py-4 text-xl font-secondaryRegular text-white bg-green rounded-3xl hover:bg-green_hover transition-all duration-300 text-nowrap">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Hero;
