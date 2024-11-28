import { useState } from "react";
import { Flashcard } from "../../types/flashcard.types";

interface UpdateFlashcardResult {
  success: boolean;
  flashcard?: Flashcard;
  error?: string | null;
}

const useUpdateFlashcard = (flashcardId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFlashcard = async (
    flashcardData: Flashcard,
  ): Promise<UpdateFlashcardResult> => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/flashcards/${flashcardId}`,
        {
          method: "PUT",
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
          "Request to update flashcard failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const flashcard: Flashcard = await response.json();
        return { success: true, flashcard: flashcard };
      }
    } catch (error) {
      return { success: false, error: "Failed to update flashcard" };
    } finally {
      setLoading(false);
    }
  };

  return { updateFlashcard, loading, error };
};

export default useUpdateFlashcard;
