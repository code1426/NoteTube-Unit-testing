import { useState, useEffect } from "react";

import type { FetchedNotesFormat } from "../../types/note.types";

interface FetchNotesResult {
  notes: FetchedNotesFormat[] | null;
  loading: boolean;
  error?: string | null;
}

const useFetchNotes = (userId: string): FetchNotesResult => {
  const [notes, setNotes] = useState<FetchedNotesFormat[] | null>(null);
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
        } else {
          const data = await response.json();
          setNotes(data);
        }
      } catch (error) {
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };
    if (userId) {
      fetchNotes();
    }
  }, [userId]);

  return { notes, loading, error };
};

export default useFetchNotes;
