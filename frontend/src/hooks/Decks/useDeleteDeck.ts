import { useState } from "react";

const API_URL = "http://localhost:3000";

const useDeleteDeck = (deckId: string) => {
  const [error, setError] = useState<string | null>(null);

  const deleteDeck = async (): Promise<{
    success: boolean;
    error: string | null;
  }> => {
    setError(null);

    try {
      const response = await fetch(`${API_URL}/decks/${deckId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          `Request to delete deck failed with status: ${response.status}`,
        );
        return {
          success: false,
          error: `Request to delete deck failed with status: ${response.status}`,
        };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error(error);
      setError("Failed to delete deck");
      return { success: false, error: "Failed to delete deck" };
    }
  };

  return { deleteDeck, error };
};

export default useDeleteDeck;
