import { useState, useContext } from "react";
import { DeckEntity } from "../../types/deck.types";
import { DecksContext } from "@/context/Contexts";

interface RenameDeckResult {
  success: boolean;
  deck?: DeckEntity;
  error?: string | null;
}

const useRenameDeck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { decks, setDecks } = useContext(DecksContext);

  const renameDeck = async (
    deckData: DeckEntity,
  ): Promise<RenameDeckResult> => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/decks/${deckData.id}/name`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deckData),
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error(errorData);
        setError(
          `Request to update deck failed with status: ${response.status}`,
        );
        return { success: false, error };
      } else {
        const updatedDeck: DeckEntity = await response.json();

        // Update the decks state with the new deck name
        setDecks(
          decks!.map((existingDeck) =>
            existingDeck.id === deckData.id
              ? { ...existingDeck, deck_name: deckData.deck_name }
              : existingDeck,
          ),
        );

        return { success: true, deck: updatedDeck };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: "Failed to update deck" };
    } finally {
      setLoading(false);
    }
  };

  return { renameDeck, loading, error };
};

export default useRenameDeck;
