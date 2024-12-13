import React from "react";

interface CardProps {
  icon: string;
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
  delay?: number;
}

const InformationCard: React.FC<CardProps> = ({
  icon,
  title,
  description,
  bgColor = "bg-green/10",
  textColor = "text-green",
  delay = 0,
}) => {
  return (
    <div
      className="infosection"
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className={`infosection flex flex-col items-center p-8 rounded-2xl ${bgColor} transform transition-all duration-300 opacity-0 -translate-y-6`}
      >
        <div className={`image mb-6 ${textColor}`}>
          <img src={icon} alt={title} className="w-24 h-24 object-contain" />
        </div>
        <h3
          className={` text-2xl font-secondaryRegular ${textColor} mb-4 text-center`}
        >
          {title}
        </h3>
        <p className="text-lg font-primaryMedium text-center text-gray-700">
          {description}
        </p>
      </div>
    </div>
  );
};

export default InformationCard;
