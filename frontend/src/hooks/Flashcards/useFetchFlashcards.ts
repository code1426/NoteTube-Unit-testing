import { useState, useEffect, useCallback } from "react";
import { Flashcard } from "../../types/flashcard.types";

const API_URL = "http://localhost:3000";

interface FetchFlashcardsResult {
  flashcards: Flashcard[] | null;
  loading: boolean;
  error?: string | null;
  refetch: () => void; // Add a refetch method for manual reloads
}

const useFetchFlashcards = (deckId: string): FetchFlashcardsResult => {
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Define the fetch function with useCallback for stability
  const fetchFlashcards = useCallback(async () => {
    if (!deckId) {
      setLoading(false);
      setError("No deck ID provided");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/decks/${deckId}/flashcards`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        setError(
          `Request to fetch flashcards failed with status: ${response.status}`,
        );
        return;
      }

      const data = await response.json();
      setFlashcards(data);
    } catch (error) {
      setError("Failed to fetch flashcards");
    } finally {
      setLoading(false);
    }
  }, [deckId]);

  // Run the fetch function on mount or when deckId changes
  useEffect(() => {
    fetchFlashcards();
  }, [fetchFlashcards]);

  return { flashcards, loading, error, refetch: fetchFlashcards };
};

export default useFetchFlashcards;
