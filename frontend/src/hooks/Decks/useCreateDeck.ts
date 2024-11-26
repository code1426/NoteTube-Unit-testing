import { useState } from "react";
import { DeckEntity } from "../../types/deck.types";

const API_URL = "http://localhost:3000";

interface CreateDeckResult {
  success: boolean;
  deck?: DeckEntity;
  error?: string | null;
}

const useCreateDeck = (userId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createDeck = async (
    DeckData: DeckEntity,
  ): Promise<CreateDeckResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/decks/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(DeckData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          "Request to create deck failed with status: " + response.status,
        );
        return { success: false, error: error };
      } else {
        const deck: DeckEntity = await response.json();
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
