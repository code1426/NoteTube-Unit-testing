import { motion } from "framer-motion";
import InformationCard from "./InformationCard";

const InformationCardsSection = () => {
  const InformationCards = [
    {
      icon: "./ai_image.png",
      title: "AI-Powered Learning",
      description:
        "Leverage cutting-edge artificial intelligence to transform your study materials into smart, interactive learning resources.",
      bgColor: "bg-green-100",
      textColor: "text-green-800",
    },
    {
      icon: "./personalization_image.png",
      title: "Personalized Experience",
      description:
        "Get tailored content recommendations and study materials that adapt to your unique learning style and needs.",
      bgColor: "bg-blue-100",
      textColor: "text-blue-800",
    },
    {
      icon: "./efficiency_image.png",
      title: "Study Efficiency",
      description:
        "Maximize your learning potential with auto-generated summaries, videos, and flashcards that help you study smarter, not harder.",
      bgColor: "bg-purple-100",
      textColor: "text-purple-800",
    },
  ];

  return (
    <section className="py-24 px-8 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-green-800 text-center mb-16"
      >
        Why Choose NoteTube
      </motion.h2>
      <div className="flex flex-col md:flex-row justify-center gap-8">
        {InformationCards.map((card, index) => (
          <InformationCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            // bgColor={card.bgColor}
            // textColor={card.textColor}
            delay={index * 0.2}
          />
        ))}
      </div>
    </section>
  );
};

export default InformationCardsSection;
