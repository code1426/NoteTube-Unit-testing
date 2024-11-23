import { useState } from "react";
import { Flashcard } from "../../types/flashcard.types";

const API_URL = "http://localhost:3000";

interface CreateFlashcardResult {
  success: boolean;
  flashcard?: Flashcard;
  error?: string | null;
}

const useCreateFlashcard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createFlashcard = async (
    flashcardData: Flashcard,
  ): Promise<CreateFlashcardResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_URL}/decks/${flashcardData.deckId}/flashcards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flashcardData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          "Request to create flashcard failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const flashcard: Flashcard = await response.json();
        return { success: true, flashcard: flashcard };
      }
    } catch (error) {
      return { success: false, error: "Failed to create flashcard" };
    } finally {
      setLoading(false);
    }
  };

  return { createFlashcard, loading };
};

export default useCreateFlashcard;
