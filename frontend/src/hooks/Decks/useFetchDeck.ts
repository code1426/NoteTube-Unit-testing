import { useState, useEffect } from "react";
import { Deck } from "../../types/deck.types";

const API_URL = "http://localhost:3000";

interface FetchDeckResult {
  deck: Deck | null;
  loading: boolean;
  error?: string | null;
}

const useFetchDeck = (deckId: string): FetchDeckResult => {
  const [deck, setDeck] = useState<Deck | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDeck = async () => {
    if (!deckId) {
      setLoading(false);
      setError("No deck ID provided");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/decks`, { method: "GET" });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          "Request to fetch deck failed with status: " + response.status,
        );
        return;
      } else {
        const data = await response.json();
        setDeck(data);
      }
    } catch (error) {
      console.error("Error fetching deck info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (deckId) fetchDeck();
  });

  return { deck, loading, error };
};

export default useFetchDeck;
