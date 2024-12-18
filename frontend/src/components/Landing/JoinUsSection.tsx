import { Link } from "react-router-dom";

const JoinUsSection = () => {
  return (
    <div className="bg-white bg-opacity-85 py-16 px-8 flex justify-center items-center w-screen">
      <div className="bg-green/10 rounded-3xl flex items-center max-w-6xl w-full overflow-hidden shadow-2xl">
        <div className="flex-1 p-12">
          <img
            src="./join_us.png"
            alt="Join NoteTube"
            className="w-full  object-contain"
          />
        </div>
        <div className="flex-1 p-12 text-center">
          <h2 className="text-5xl font-secondaryRegular text-green mb-6 select-none">
            Transform Your Learning Today
          </h2>
          <p className="text-xl font-primaryMedium text-gray-700 mb-8 select-none">
            Unlock the power of AI-driven learning. NoteTube is your smart
            companion for efficient, engaging study experiences.
          </p>
          <Link to="/register">
            <button
              className="bg-green text-white text-2xl font-secondaryRegular 
            px-10 py-4 rounded-full
            transition-colors duration-300 ease-in-out 
            transform hover:scale-105 shadow-lg hover:bg-green_hover"
            >
              Start Learning Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinUsSection;
