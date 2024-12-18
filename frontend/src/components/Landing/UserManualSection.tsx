import { motion } from "framer-motion";
import UserManualCard from "./UserManualCard";

const UserManualSection = () => {
  const steps = [
    {
      image: "./upload.png",
      alt: "Upload Notes",
      title: "1. Upload",
      description:
        "Easily upload your notes in various formats - PDFs, images, text documents",
    },
    {
      image: "./generate.png",
      alt: "Generate Content",
      title: "2. Generate",
      description:
        "Get auto-generated summaries, relevant videos, and interactive flashcards",
    },
    {
      image: "./review.png",
      alt: "Review Content",
      title: "3. Review",
      description:
        "Review and interact with AI-generated content to enhance your learning",
    },
  ];

  return (
    <section className="bg-gradient-to-b from-green-600 to-green-800 py-24 px-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
      >
        How It Works
      </motion.h2>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-12 md:space-y-0 md:space-x-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <UserManualCard {...step} />
            {index < steps.length - 1 && (
              <motion.div
                className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
              >
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default UserManualSection;
