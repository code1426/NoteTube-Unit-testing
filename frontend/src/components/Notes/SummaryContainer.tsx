import React from "react";

interface SummaryContainerProps {
  content: string;
}

const SummaryContainer: React.FC<SummaryContainerProps> = ({ content }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Summary</h2>
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">
        {content}
      </p>
    </div>
  );
};

export default SummaryContainer;
