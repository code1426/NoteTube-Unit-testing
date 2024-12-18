import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  icon: string;
  title: string;
  description: string;
  delay?: number;
}

const InformationCard: React.FC<CardProps> = ({
  icon,
  title,
  description,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.2 }}
      className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center"
    >
      <img src={icon} alt={title} className="w-20 h-20 mb-6" />
      <h3 className="text-2xl font-bold text-green-800 mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
};

export default InformationCard;
