import { useState, useEffect, useContext } from "react";

import type {
  FetchedNoteWithVideos,
  NoteWithVideos,
} from "../../types/note.types";
import { NotesContext } from "@/context/Contexts";
import separateNotesWithVideos from "@/utils/notesFormatter";

interface FetchNotesResult {
  notes?: NoteWithVideos[] | null;
  loading: boolean;
  error?: string | null;
}

const useFetchNotes = (userId: string): FetchNotesResult => {
  const { setNotes } = useContext(NotesContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/notes?userId=${userId}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          setError(
            "Request to fetch notes failed with status: " + response.status,
          );
          return;
        }
        const fetchedNotes: FetchedNoteWithVideos[] = await response.json();
        const notes = separateNotesWithVideos(fetchedNotes);
        setNotes(notes);
      } catch (error) {
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchNotes();
    }
  }, [userId, setNotes]);

  return { loading, error };
};

export default useFetchNotes;
