import { useState, useContext } from "react";
import { DeckEntity } from "../../types/deck.types";
import { DecksContext } from "@/context/Contexts";

interface ChangeDeckColorResult {
  success: boolean;
  deck?: DeckEntity;
  error?: string | null;
}

const useChangeDeckColor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { decks, setDecks } = useContext(DecksContext);

  const changeDeckColor = async (
    deckData: DeckEntity,
  ): Promise<ChangeDeckColorResult> => {
    setLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/decks/${deckData.id}/color`,
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
        console.log(errorData);
        setError(
          "Request to update deck failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        // Update the decks state with the new deck color
        setDecks(
          decks!.map((existingDeck) =>
            existingDeck.id === deckData.id
              ? { ...existingDeck, color: deckData.color }
              : existingDeck,
          ),
        );

        const deck: DeckEntity = await response.json();
        return { success: true, deck: deck };
      }
    } catch (error) {
      return { success: false, error: "Failed to update deck" };
    } finally {
      setLoading(false);
    }
  };

  return { changeDeckColor, loading, error };
};

export default useChangeDeckColor;
