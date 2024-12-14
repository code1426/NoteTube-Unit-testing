import { Link } from "react-router-dom";
import { Tilt } from "@jdion/tilt-react";

const Hero = () => {
  return (
    <div className="relative flex flex-grow flex-col min-h-screen p-8 items-center justify-center gap-4 bg-[url('/path-to-your-background.jpg')] bg-cover bg-center select-none">
      <Tilt
        options={{
          max: 15,
          scale: 1.05,
          speed: 400,
          reverse: true,
          perspective: 1000,
          transition: true,
          axis: null,
          reset: true,
          easing: "cubic-bezier(0.03, 0.98, 0.52, 0.99)",
        }}
        className="p-8 rounded-2xl backdrop-blur-xs shadow-xs"
      >
        <div className="text-green font-secondaryRegular bg-none text-center">
          <div className="text-8xl">Your AI-Powered Study Companion</div>
        </div>
      </Tilt>

      <Link to="/register">
        <button className="px-12 py-4 text-xl font-secondaryRegular text-white bg-green rounded-3xl hover:bg-green_hover transition-all duration-300 text-nowrap">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default Hero;
