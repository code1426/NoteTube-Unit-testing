import { useState, useEffect, useContext } from "react";
import { Flashcard } from "../../types/flashcard.types";
import { FlashcardsContext } from "@/context/Contexts";

interface FetchFlashcardsResult {
  flashcards: Flashcard[] | undefined;
  loading: boolean;
  error?: string | null;
}

const useFetchFlashcards = (deckId: string): FetchFlashcardsResult => {
  const { flashcards, setFlashcards } = useContext(FlashcardsContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!deckId) {
        setLoading(false);
        return;
      }

      try {
        setFlashcards([]);
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/decks/${deckId}/flashcards`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
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
  }, [deckId]);

  return { flashcards, loading, error };
};

export default useFetchFlashcards;
