import { useState, useContext } from "react";
import { FlashcardsContext } from "@/context/Contexts";
import { DecksContext } from "@/context/Contexts";

const useDeleteFlashcard = (flashcardId: string, deckId: string) => {
  const [error, setError] = useState<string | null>(null);
  const { flashcards, setFlashcards } = useContext(FlashcardsContext);
  const { decks, setDecks } = useContext(DecksContext);

  const deleteFlashcard = async (): Promise<{
    success: boolean;
    error: string | null;
  }> => {
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/flashcards/${flashcardId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          `Request to delete flashcard failed with status: ${response.status}`,
        );
        return {
          success: false,
          error: `Request to delete flashcard failed with status: ${response.status}`,
        };
      }

      // Remove the deleted flashcard from the flashcards context
      setFlashcards(
        flashcards!.filter((flashcard) => flashcard.id !== flashcardId),
      );

      // Update the deck count in the decks context as well
      setDecks(
        decks!.map((existingDeck) =>
          existingDeck.id === deckId
            ? { ...existingDeck, card_count: existingDeck.card_count! - 1 }
            : existingDeck,
        ),
      );

      return { success: true, error: null };
    } catch (error) {
      console.error(error);
      setError("Failed to delete flashcard");
      return { success: false, error: "Failed to delete flashcard" };
    }
  };

  return { deleteFlashcard, error };
};

export default useDeleteFlashcard;
