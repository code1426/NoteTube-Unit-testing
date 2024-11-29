import type { ReactNode } from "react";

export interface SectionProps {
  title: string;
  description: string;
  reverse: boolean;
  Icon?: ReactNode;
}

const Section = ({
  title,
  description,
  reverse = true,
  Icon,
}: SectionProps) => {
  const position = Icon ? "" : "justify-center ";
  const order = reverse ? "flex-row-reverse" : "flex-row";
  const textColor = reverse ? "text-white" : "text-green";
  const bgColor = reverse ? "bg-green" : "bg-white";

  return (
    <div
      className={`flex ${order} ${bgColor} ${position} bg-opacity-85 p-16 sm:p-44 select-none`}
    >
      <div className="flex flex-[2] flex-col  gap-12">
        <div
          className={`text-6xl font-secondaryRegular ${textColor} text-center`}
        >
          {title}
        </div>
        <div className={`text-xl font-primaryMedium text-black text-justify`}>
          {description}
        </div>
      </div>
      {Icon && (
        <div
          className={`flex flex-1 ${textColor} justify-center self-start sm:self-center text-9xl`}
        >
          {Icon}
        </div>
      )}
    </div>
  );
};

export default Section;
