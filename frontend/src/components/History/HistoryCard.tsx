// import React, { useState } from "react";
import { Note } from "../../types/note.types";
import { Link } from "react-router-dom";
import HistoryGeneratedVideoThumbnail from "./GeneratedVideoThumbnail";

const NotesHistoryCard = ({ id, topic, createdAt }: Note) => {
  // const sample_title = "5yfh5cf4-0w";

  const generatedVideosThumbnail = [
    {
      url: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
      title: "Calculus 1 - Derivatives",
      id: "",
    },
    {
      url: "https://static-cse.canva.com/blob/1396717/1600w-wK95f3XNRaM.jpg",
      title: "Calculus 1 - Derivatives",
      id: "",
    },
  ];

  return (
    <div
      className={`flex flex-col border-[3px] border-green border-solid rounded-3xl w-4/6 h-auto font-secondaryRegular cursor-pointer transition-transform duration-100 "bg-green text-white" : "bg-white"
     hover:scale-[1.03] hover:ease-in-out overflow-hidden`}
    >
      {/* The div below is for the date and delete button */}
      <div className="flex flex-row justify-between bg-green p-3 border-green">
        <div>{createdAt}</div>
        <div>DELETE</div>
      </div>
      <div className="p-3">
        <Link to={`/notes/${id}`}>
          {/* The div below is for the note topic title */}
          <div>
            <p>{topic}</p>
          </div>
          {/* The div is for the generated videos */}
          <div className="flex flex-row justify-start gap-3">
            {generatedVideosThumbnail!.map((generatedVideo) => (
              <HistoryGeneratedVideoThumbnail
                url={generatedVideo.url}
                videoTitle={generatedVideo.title}
                id={generatedVideo.id}
              />
            ))}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotesHistoryCard;
