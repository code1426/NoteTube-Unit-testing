import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="relative flex flex-col md:flex-row min-h-screen mt-16 p-6 md:mt-0 lg:mt-0 xl:mt-0 md:p-16 lg:p-16 xl:p-16 items-center justify-center gap-8 bg-gradient-to-b from-green-50 to-white select-none">
      <motion.div
        className="flex-1 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6">
          Your AI-Powered Study Companion
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto md:mx-0">
          Transform your notes into interactive learning experiences with
          NoteTube
        </p>
        <Link to="/register">
          <motion.button
            className="px-8 py-4 text-xl font-bold text-white bg-green-600 rounded-full hover:bg-green-700 transition-all duration-300 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </Link>
      </motion.div>
      <motion.div
        className="flex-1"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <video
          className="w-full rounded-lg shadow-xl"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="../test.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>
    </div>
  );
};

export default Hero;
