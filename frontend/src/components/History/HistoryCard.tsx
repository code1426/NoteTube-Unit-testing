// import React, { useState } from "react";
import { FullNoteContent, Note } from "../../types/note.types";
import { Link } from "react-router-dom";
import HistoryGeneratedVideoThumbnail from "./GeneratedVideoThumbnail";
import { Video } from "lucide-react";
import { useEffect } from "react";

const NotesHistoryCard = ({
  id,
  title,
  createdAt,
  videos,
}: FullNoteContent) => {
  return (
    <div
      className={`flex flex-col border-[3px] border-green border-solid rounded-3xl w-4/6 h-auto font-secondaryRegular cursor-pointer transition-transform duration-100 "bg-green text-white" : "bg-white"
     hover:scale-[1.03] hover:ease-in-out overflow-hidden select-none`}
    >
      {/* The div below is for the date and delete button */}
      <div className="flex flex-row justify-between bg-green p-3 border-green">
        <div className="text-xl">{createdAt}</div>
        <div>DELETE</div>
      </div>
      <div className="p-3">
        <Link to={`/notes/${id}`}>
          {/* The div below is for the note topic title */}
          <div>
            <p>{title}</p>
          </div>
          {/* The div is for the generated videos */}
          <div className="flex flex-row justify-start gap-3">
            {!videos ? (
              <></>
            ) : (
              videos!.map((video) => (
                <HistoryGeneratedVideoThumbnail
                  key={video.videoId}
                  url={video.thumbnailUrl}
                  id={video.videoId}
                />
              ))
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default NotesHistoryCard;
