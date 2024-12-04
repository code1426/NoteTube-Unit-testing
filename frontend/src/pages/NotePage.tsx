import React from "react";
// import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import GeneratedVideoCard from "../components/Notes/GeneratedVideoCard";

const NotePage: React.FC = () => {
  //   const { noteId } = useParams<{ noteId: string }>();
  const sample_content = {
    id: "1234-5678-90",
    content: "note content",
    topic: "topic title",
    createdAt: "mm/mm/mm",
    userId: "0",
  };

  const sample_generated_videos = [
    {
      url: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
      title: "Calculus 1 - Derivatives",
      id: "5yfh5cf4-0w",
    },
    {
      url: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
      title: "Calculus 1 - Derivatives",
      id: "FLAm7Hqm-58",
    },
    {
      url: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
      title: "Calculus 1 - Derivatives",
      id: "rAof9Ld5sOg",
    },
    {
      url: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
      title: "Calculus 1 - Derivatives",
      id: "N2PpRnFqnqY",
    },
    {
      url: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
      title: "Calculus 1 - Derivatives",
      id: "gSpItqgZ1mo",
    },
  ];

  return (
    <div className="bg-white relative font-secondaryRegular">
      <Header
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle={"Note Title"}
        onAdd={() => {}}
        hasAddButton={false}
      />
      <div className="w-full flex flex-col items-center">
        {/* The div below is for the uploaded notes content */}
        <div>
          <p>{sample_content.content}</p>
        </div>
        {/* The div below is for the generated videos */}
        <div className="w-full flex flex-col justify-center items-center gap-4">
          {sample_generated_videos!.map((generatedVideo) => (
            <GeneratedVideoCard
              url={generatedVideo.url}
              videoTitle={generatedVideo.title}
              id={generatedVideo.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotePage;
