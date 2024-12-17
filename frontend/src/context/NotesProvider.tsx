import { NoteWithVideos } from "@/types/note.types";
import React, { useState } from "react";
import { NotesContext } from "./Contexts";

const NotesProvider = ({ children }: { children: React.ReactNode }) => {
  const [notes, setNotes] = useState<NoteWithVideos[]>();
  const [isUploading, setIsUploading] = useState(false);

  return (
    <NotesContext.Provider
      value={{ isUploading, setIsUploading, notes, setNotes }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesProvider;
