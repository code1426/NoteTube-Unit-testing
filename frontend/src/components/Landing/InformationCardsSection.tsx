import InformationCard from "./InformationCard";

const InformationCardsSection = () => {
  const InformationCards = [
    {
      icon: "/src/assets/images/ai_image.png",
      title: "AI-Powered Learning",
      description:
        "Leverage cutting-edge artificial intelligence to transform your study materials into smart, interactive learning resources.",
      bgColor: "bg-green/10",
      textColor: "text-green",
    },
    {
      icon: "/src/assets/images/personalization_image.png",
      title: "Personalized Experience",
      description:
        "Get tailored content recommendations and study materials that adapt to your unique learning style and needs.",
      bgColor: "bg-green/25",
      textColor: "text-blue",
    },
    {
      icon: "/src/assets/images/efficiency_image.png",
      title: "Study Efficiency",
      description:
        "Maximize your learning potential with auto-generated summaries, videos, and flashcards that help you study smarter, not harder.",
      bgColor: "bg-green/50",
      textColor: "text-purple",
    },
  ];

  return (
    <div className="py-24 px-8 bg-white min-h-screen">
      <h2 className="text-6xl font-secondaryRegular text-green text-center mb-12 px-60">
        <div className="bg-lime-200">Why Choose NoteTube</div>
      </h2>
      <div className="flex justify-center gap-8">
        {InformationCards.map((card, index) => (
          <InformationCard
            key={index}
            icon={card.icon}
            title={card.title}
            description={card.description}
            bgColor={card.bgColor}
            textColor={card.textColor}
          />
        ))}
      </div>
    </div>
  );
};

export default InformationCardsSection;
