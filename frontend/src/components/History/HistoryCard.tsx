import React, { useState } from "react";
import { Note } from "../../types/note.types";
import { Link } from "react-router-dom";

const NotesHistoryCard = ({ id, topic, summary, createdAt, userId }: Note) => {
  return (
    <div
      className={`flex flex-col border-[6px] border-green border-solid rounded-3xl w-4/6 h-32 p-3 font-secondaryRegular cursor-pointer transition-transform duration-100 "bg-green text-white" : "bg-white"
     hover:scale-[1.03] hover:ease-in-out`}
    >
      {/* The div below is for the date and delete button */}
      <div className="flex flex-row justify-between">
        <div>{createdAt}</div>
        <div>DELETE</div>
      </div>
      <Link to={`/notes/${id}`}>
        {/* The div below is for the note topic title */}
        <div>
          <p>{topic}</p>
        </div>
        {/* The div is for the generated videos */}
        <div></div>
      </Link>
    </div>
  );
};

export default NotesHistoryCard;
