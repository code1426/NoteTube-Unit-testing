import { useState, useContext } from "react";
import { Flashcard } from "../../types/flashcard.types";
import { FlashcardsContext } from "@/context/Contexts";

interface UpdateFlashcardResult {
  success: boolean;
  flashcard?: Flashcard;
  error?: string | null;
}

const useUpdateFlashcard = (flashcardId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { flashcards, setFlashcards } = useContext(FlashcardsContext);

  const updateFlashcard = async (
    flashcardData: Flashcard,
  ): Promise<UpdateFlashcardResult> => {
    try {
      setLoading(true);
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
        setError(
          "Request to update flashcard failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const flashcard: Flashcard = await response.json();

        setFlashcards(
          flashcards!.map((existingCard) =>
            existingCard.id === flashcardData.id
              ? {
                  ...existingCard,
                  front: flashcardData.front,
                  back: flashcardData.back,
                }
              : existingCard,
          ),
        );
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
