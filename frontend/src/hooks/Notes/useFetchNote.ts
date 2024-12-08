import { useState, useEffect } from "react";

import type { FetchedNotesFormat } from "../../types/note.types";

interface FetchNoteResult {
  note: FetchedNotesFormat[] | null;
  noteLoading: boolean;
  noteError?: string | null;
}

const useFetchNote = (noteId: string): FetchNoteResult => {
  const [note, setNote] = useState<FetchedNotesFormat[] | null>(null);
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

        const data = await noteResponse.json();
        setNote(data);
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
