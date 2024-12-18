import { ReactNode } from "react";
import { motion } from "framer-motion";

export interface SectionProps {
  title: string;
  description: string;
  reverse: boolean;
  Icon?: ReactNode;
  image?: string;
}

const Section = ({
  title,
  description,
  reverse = true,
  Icon,
  image,
}: SectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`flex flex-col ${reverse ? "md:flex-row-reverse" : "md:flex-row"} ${title === "About Us" && "md:py-52 :py-52 xl:py-52"} items-center justify-center gap-8 py-24 px-8 bg-white`}
    >
      <div className="flex-1 max-w-xl mx-0 md:mx-20">
        <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
          {title}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">{description}</p>
      </div>
      <div className=" flex justify-center items-center">
        {image ? (
          <motion.img
            src={image}
            alt={title}
            className="max-w-[500px] w-full h-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          />
        ) : Icon ? (
          <div className="text-9xl text-green-600">{Icon}</div>
        ) : null}
      </div>
    </motion.div>
  );
};

export default Section;
