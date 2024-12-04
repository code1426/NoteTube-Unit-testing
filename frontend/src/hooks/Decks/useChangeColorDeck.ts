import { useState } from "react";
import { Deck } from "../../types/deck.types";

interface ChangeDeckColorResult {
  success: boolean;
  deck?: Deck;
  error?: string | null;
}

const useChangeDeckColor = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const changeDeckColor = async (
    deckData: Deck,
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
        const deck: Deck = await response.json();
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
