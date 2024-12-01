import React from "react";

interface NoItemsContainerBoxProps {
  mainText: string;
  subText: string;
  imageSrc: string;
  altText: string;
}

const NoItemsContainerBox: React.FC<NoItemsContainerBoxProps> = ({
  mainText,
  subText,
  imageSrc,
  altText,
}) => {
  return (
    <div className="text-center flex flex-col items-center gap-4 border-2 shadow-md p-6 rounded-lg">
      <img src={imageSrc} alt={altText} className="w-52 h-52" />
      <p className="text-3xl font-bold text-primaryRegular">{mainText}</p>
      <p className="text-2xl text-primaryRegular">{subText}</p>
    </div>
  );
};

export default NoItemsContainerBox;
