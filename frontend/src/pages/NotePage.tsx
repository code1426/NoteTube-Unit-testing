import React from "react";
// import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";

const NotePage: React.FC = () => {
  //   const { noteId } = useParams<{ noteId: string }>();
  const sample_title = "5yfh5cf4-0w";

  return (
    <div className="bg-white relative">
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={true}
        sectionTitle={"Note Title"}
        onAdd={() => {}}
        hasAddButton={false}
      />
      <iframe
        width="420"
        height="315"
        src={`https://www.youtube.com/embed/${sample_title}`}
      ></iframe>
    </div>
  );
};

export default NotePage;
