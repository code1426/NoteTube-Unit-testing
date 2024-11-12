import React, { useState } from "react";

const NotesHistoryPage: React.FC = () => {
  const [clickedIndex, setClickedIndex] = useState<number | null>(null);
  const items = [
    { date: "mm/mm/mm", name: "Differential Equation" },
    { date: "mm/mm/mm", name: "Linear Algebra" },
    { date: "mm/mm/mm", name: "Calculus" },
    { date: "mm/mm/mm", name: "Statistics" },
  ];

  const handleClick = (index: number) => {
    setClickedIndex(index);
    console.log("clicked");

    setTimeout(() => {
      setClickedIndex(null);
    }, 100);
  };

  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <div id="back-button"></div>
      <div id="search-filter" className="h-6">
        Header Here
      </div>
      <div
        id="history-lists"
        className="flex flex-col items-center mt-4 p-4 w-full h-[80vh] overflow-y-auto gap-8"
      >
        {items.map((item, index) => (
          <div
            key={index}
            id="history-contents"
            className={`flex flex-col border-[6px] border-green border-solid rounded-3xl w-4/6 h-32 p-3 font-secondaryRegular cursor-pointer transition-transform duration-100 ${
              clickedIndex === index ? "bg-green text-white" : "bg-white"
            } hover:scale-[1.03] hover:ease-in-out`}
            onClick={() => handleClick(index)}
          >
            <div id="history-date" className="flex w-auto h-10 my-2">
              {item.date}
            </div>
            <div
              id="history-name"
              className={`border-2 border-solid p-2 mb-2 rounded-xl ${
                clickedIndex === index
                  ? "text-white border-white"
                  : "text-black border-green"
              }`}
            >
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesHistoryPage;
