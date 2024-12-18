import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface LandingHeaderProps {
  refs?: {
    introductionRef: React.RefObject<HTMLDivElement>;
    discoverRef: React.RefObject<HTMLDivElement>;
    aboutRef: React.RefObject<HTMLDivElement>;
    featureRef: React.RefObject<HTMLDivElement>;
    faqsRef: React.RefObject<HTMLDivElement>;
  };
}

const LandingHeader: React.FC<LandingHeaderProps> = ({ refs }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-50 shadow-md"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="NoteTube Logo" className="w-8 h-8" />
          <span className="text-2xl font-bold text-green-600">NoteTube</span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => refs?.aboutRef && scrollToSection(refs.aboutRef)}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => refs?.featureRef && scrollToSection(refs.featureRef)}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => refs?.faqsRef && scrollToSection(refs.faqsRef)}
            className="text-gray-600 hover:text-green-600 transition-colors"
          >
            FAQs
          </button>
        </nav>
        <div className="hidden md:flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 w-24 flex items-center justify-center text-green-600 border border-green-600 rounded-full hover:bg-green-600 hover:text-white transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 w-24 flex items-center justify-center text-white bg-green-600 rounded-full hover:bg-green-700 transition-colors"
          >
            Sign Up
          </Link>
        </div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white px-4 py-2"
        >
          <button
            onClick={() => refs?.aboutRef && scrollToSection(refs.aboutRef)}
            className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            About
          </button>
          <button
            onClick={() => refs?.featureRef && scrollToSection(refs.featureRef)}
            className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            Features
          </button>
          <button
            onClick={() => refs?.faqsRef && scrollToSection(refs.faqsRef)}
            className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            FAQs
          </button>
          <Link
            to="/login"
            className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/register"
            className="block py-2 text-gray-600 hover:text-green-600 transition-colors"
          >
            Sign Up
          </Link>
        </motion.div>
      )}
    </motion.header>
  );
};

export default LandingHeader;
