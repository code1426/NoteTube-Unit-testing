import { useState, useContext } from "react";
import { Flashcard } from "../../types/flashcard.types";
import { FlashcardsContext, DecksContext } from "@/context/Contexts";

interface CreateFlashcardResult {
  success: boolean;
  flashcard?: Flashcard;
  error?: string | null;
}

const useCreateFlashcard = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { flashcards, setFlashcards } = useContext(FlashcardsContext);
  const { decks, setDecks } = useContext(DecksContext);

  const createFlashcard = async (
    flashcardData: Flashcard,
  ): Promise<CreateFlashcardResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/decks/${flashcardData.deckId}/flashcards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(flashcardData),
        },
      );

      if (!response.ok) {
        setError(
          "Request to create flashcard failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const flashcard: Flashcard = await response.json();

        setFlashcards([...flashcards!, flashcard]);

        // Update the deck count in the decks context as well
        setDecks(
          decks!.map((existingDeck) =>
            existingDeck.id === flashcardData.deckId
              ? {
                  ...existingDeck,
                  card_count: Number(existingDeck.card_count) + 1,
                }
              : existingDeck,
          ),
        );

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
