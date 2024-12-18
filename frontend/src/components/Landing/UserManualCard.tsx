import React from "react";
import { motion } from "framer-motion";

interface UserManualCardProps {
  image: string;
  alt: string;
  title: string;
  description: string;
}

const UserManualCard: React.FC<UserManualCardProps> = ({
  image,
  alt,
  title,
  description,
}) => {
  return (
    <motion.div
      className="flex flex-col items-center max-w-xs"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <img
          src={image}
          alt={alt}
          className="w-48 h-48 object-contain mx-auto"
        />
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 text-center">
        {title}
      </h3>
      <p className="text-lg text-green-100 text-center">{description}</p>
    </motion.div>
  );
};

export default UserManualCard;
