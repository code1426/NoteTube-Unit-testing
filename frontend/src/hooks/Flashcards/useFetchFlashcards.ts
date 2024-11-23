import { useState, useEffect } from "react";
import { Flashcard } from "../../types/flashcard.types";

const API_URL = "http://localhost:3000";

interface FetchFlashcardsResult {
  flashcards: Flashcard[] | null;
  loading: boolean;
  error?: string | null;
}

const useFetchFlashcards = (deckId: string): FetchFlashcardsResult => {
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!deckId) {
        setLoading(false);
        setError("No deck ID provided");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
          method: "GET",
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          setError(
            "Request to fetch flashcards failed with status: " +
              response.status,
          );
          return;
        } else {
          const data = await response.json();
          setFlashcards(data);
        }
      } catch (error) {
        setError("Failed to fetch flashcards");
      } finally {
        setLoading(false);
      }
    };
    fetchFlashcards();
  });

  return { flashcards, loading, error };
};

export default useFetchFlashcards;
