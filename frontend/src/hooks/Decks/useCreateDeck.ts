import { useState } from "react";
import { Deck } from "../../types/deck.types";

interface CreateDeckResult {
  success: boolean;
  deck?: Deck;
  error?: string | null;
}

const useCreateDeck = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDeck = async (deckData: Deck): Promise<CreateDeckResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/decks/${deckData.userId}`,
        {
          method: "POST",
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
          "Request to create deck failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const deck: Deck = await response.json();
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
