import { useState } from "react";

import type { CreateNoteData, FetchedNote, Note } from "../../types/note.types";

interface CreateNoteResult {
  success: boolean;
  note?: Note;
  error?: string | null;
}

const useCreateNote = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createNote = async (
    noteData: CreateNoteData,
  ): Promise<CreateNoteResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/notes/${noteData.userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(noteData),
        },
      );

      if (!response.ok) {
        setError(
          "Request to create note failed with status: " + response.status,
        );
        return { success: false, error: error };
      }

      const note: FetchedNote = await response.json();

      return {
        success: true,
        note: {
          ...note,
          createdAt: note.created_at,
          userId: note.user_id,
        } as Note,
      };
    } catch (_error) {
      return { success: false, error: error };
    } finally {
      setLoading(false);
    }
  };

  return { createNote, loading };
};

export default useCreateNote;
