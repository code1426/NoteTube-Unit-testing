import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQs = () => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is NoteTube?",
      answer:
        "NoteTube is a web app that allows users to upload their notes and generates summarized content, relevant YouTube videos, and flashcards to help with study and review.",
    },
    {
      question: "How does it work?",
      answer:
        "Users can upload their notes to the platform. NoteTube processes the uploaded content, summarizes it, and then suggests related YouTube videos for better understanding. Additionally, it creates flashcards for effective review sessions.",
    },
    {
      question: "How do you use NoteTube?",
      answer:
        "Simply create an account, upload your notes in supported formats, and let NoteTube do the rest. You can access the generated content and flashcards from your dashboard.",
    },
    {
      question: "Is it free?",
      answer:
        "Yes, NoteTube offers a free tier with essential features. For advanced functionalities, such as premium video suggestions and unlimited flashcard generation, users can subscribe to a paid plan.",
    },
    {
      question: "Is there a limit to the notes you upload?",
      answer:
        "Yes, there is a limit. Since this app is free, we are using free storage systems to deploy our app. That's why there is a limit to the number of times you can upload your notes, as our database can only hold up to 50 rows.",
    },
  ];

  return (
    <section className="py-24 px-8 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-green-800"
      >
        Frequently Asked Questions
      </motion.h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => setOpenItem(openItem === index ? null : index)}
              className="flex justify-between items-center w-full p-6 text-left"
            >
              <span className="text-xl font-semibold text-gray-800">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 transition-transform ${openItem === index ? "transform rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <AnimatePresence>
              {openItem === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-6"
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
