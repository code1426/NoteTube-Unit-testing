import { useEffect, useState } from "react";
import { Deck } from "../../types/deck.types";

const API_URL = "http://localhost:3000";

interface FetchUserDecksResult {
  userDecks: Deck[] | null;
  loading: boolean;
  error?: string | null;
  refetch: () => void;
}

const useFetchUserDecks = (userId: string): FetchUserDecksResult => {
  const [userDecks, setUserDecks] = useState<Deck[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDecks = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/decks?userId=${userId}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          "Request to fetch user decks failed with status: " + response.status,
        );
        return;
      } else {
        const data = await response.json();
        setUserDecks(data);
      }
    } catch (error) {
      console.error("Error fetching user decks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchDecks();
    }
  });

  return { userDecks, loading, error, refetch: fetchDecks };
};

export default useFetchUserDecks;
