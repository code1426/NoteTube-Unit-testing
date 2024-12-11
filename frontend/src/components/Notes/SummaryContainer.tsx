import React from "react";

interface SummaryContainerProps {
  content: string;
}

const SummaryContainer: React.FC<SummaryContainerProps> = ({ content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg w-full max-w-6xl p-4 tracking-wide">
      <h2 className="text-xl font-semibold text-gray-800 pb-2">Summary</h2>
      <p className="text-gray-700 whitespace-pre-line">{content}</p>
    </div>
  );
};

export default SummaryContainer;
