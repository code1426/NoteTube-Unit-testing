import React from "react";

interface CardProps {
  icon: string;
  title: string;
  description: string;
  bgColor?: string;
  textColor?: string;
}

const InformationCard: React.FC<CardProps> = ({
  icon,
  title,
  description,
  bgColor = "bg-green/10",
  textColor = "text-green",
}) => {
  return (
    <div
      className={`flex flex-col items-center p-8 rounded-2xl ${bgColor} transform transition-all duration-300 hover:scale-105 hover:shadow-lg`}
    >
      <div className={`mb-6 ${textColor}`}>
        <img src={icon} alt={title} className="w-24 h-24 object-contain" />
      </div>
      <h3
        className={`text-2xl font-secondaryRegular ${textColor} mb-4 text-center`}
      >
        {title}
      </h3>
      <p className="text-lg font-primaryMedium text-center text-gray-700">
        {description}
      </p>
    </div>
  );
};

export default InformationCard;
