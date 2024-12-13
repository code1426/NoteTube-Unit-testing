import React from "react";
import { Tilt } from "@jdion/tilt-react";

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
    <div className="flex flex-col items-center">
      {/* Wrap the card container with the Tilt component */}
      <Tilt
        options={{
          max: 15,
          scale: 1.1,
          speed: 400,
          reverse: true,
          perspective: 1000,
          transition: true,
          axis: null,
          reset: true,
          easing: "cubic-bezier(0.03, 0.98, 0.52, 0.99)",
        }}
        className="bg-white/50 p-8 rounded-2xl mb-4"
      >
        <img
          src={`${image}`}
          alt={`${alt}`}
          className="w-64 h-64 object-contain"
        />
      </Tilt>
      <div className="text-center">
        <h3 className="text-3xl font-secondaryRegular text-white mb-4 px-20">
          {title}
        </h3>
        <p className="text-xl font-primaryMedium max-w-xs">{description}</p>
      </div>
    </div>
  );
};

export default UserManualCard;
