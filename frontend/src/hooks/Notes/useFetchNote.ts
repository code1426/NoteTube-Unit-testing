import { useState, useEffect } from "react";

import type {
  FetchedNoteWithVideos,
  NoteWithVideos,
} from "../../types/note.types";
import separateNotesWithVideos from "@/utils/notesFormatter";

interface FetchNoteResult {
  note: NoteWithVideos | null;
  noteLoading: boolean;
  noteError?: string | null;
}

const useFetchNote = (noteId: string): FetchNoteResult => {
  const [note, setNote] = useState<NoteWithVideos | null>(null);
  const [noteLoading, setNoteLoading] = useState<boolean>(true);
  const [noteError, setNoteError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId) {
        setNoteLoading(false);
        setNoteError("No note ID provided");
        return;
      }

      try {
        const noteResponse = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/notes/${noteId}`,
          {
            method: "GET",
          },
        );

        console.log(`${import.meta.env.VITE_BASE_API_URL}/notes/${noteId}`);

        if (!noteResponse.ok) {
          const errorData = await noteResponse.json();
          console.log(errorData);
          setNoteError(
            "Request to fetch note failed with status: " + noteResponse.status,
          );
          return;
        }
        const fetchedNote: FetchedNoteWithVideos[] = await noteResponse.json();
        const note = separateNotesWithVideos(fetchedNote);
        setNote(note[0]);
      } catch (error) {
        setNoteError("Failed to fetch note");
      } finally {
        setNoteLoading(false);
      }
    };

    fetchNote();
  }, [noteId]);

  return { note, noteLoading, noteError };
};

export default useFetchNote;
