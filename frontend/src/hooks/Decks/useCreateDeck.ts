import { useState, useContext } from "react";
import { DeckEntity } from "../../types/deck.types";
import { DecksContext } from "@/context/Contexts";

interface CreateDeckResult {
  success: boolean;
  deck?: DeckEntity;
  error?: string | null;
}

const useCreateDeck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { decks, setDecks } = useContext(DecksContext);

  const createDeck = async (
    deckData: DeckEntity,
  ): Promise<CreateDeckResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/decks/${deckData.user_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(deckData),
        },
      );

      if (!response.ok) {
        setError(
          "Request to create deck failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const deck: DeckEntity = await response.json();
        setDecks([...decks!, { ...deck, card_count: deckData.card_count }]);
        return { success: true, deck };
      }
    } catch (error) {
      return { success: false, error: "Failed to create deck" };
    } finally {
      setLoading(false);
    }
  };

  return { createDeck, loading };
};

export default useCreateDeck;
