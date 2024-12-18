import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const JoinUsSection = () => {
  return (
    <section className="py-24 px-8 bg-gradient-to-b from-gray-50 to-gray-200 ">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1"
          >
            <img
              src="./join_us.png"
              alt="Join NoteTube"
              className="w-full h-auto object-contain"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1 px-6 py-8 md:px-8 lg:px-8 xl:px-8 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Transform Your Learning Today
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Unlock the power of AI-driven learning. NoteTube is your smart
              companion for efficient, engaging study experiences.
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white text-lg md:text-xl lg:text-xl  xl:text-xl font-bold 
                px-10 py-4 rounded-full
                transition-colors duration-300 ease-in-out 
                hover:bg-green-700 shadow-lg"
              >
                Start Learning Now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default JoinUsSection;
