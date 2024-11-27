import { useState } from "react";
import { Deck } from "../../types/deck.types";

const API_URL = "http://localhost:3000";

interface UpdateDeckResult {
  success: boolean;
  deck?: Deck;
  error?: string | null;
}

const useUpdateDeck = (deckId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateDeck = async (deckData: Deck): Promise<UpdateDeckResult> => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/decks/${deckId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(deckData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          "Request to update deck failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const deck: Deck = await response.json();
        return { success: true, deck: deck };
      }
    } catch (error) {
      return { success: false, error: "Failed to update deck" };
    } finally {
      setLoading(false);
    }
  };

  return { updateDeck, loading, error };
};

export default useUpdateDeck;
