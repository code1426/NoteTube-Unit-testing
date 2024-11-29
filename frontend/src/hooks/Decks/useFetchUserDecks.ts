import { useEffect, useState } from "react";
import { DeckEntity } from "../../types/deck.types";

interface FetchUserDecksResult {
  userDecks: DeckEntity[] | null;
  loading: boolean;
  error?: string | null;
}

const useFetchUserDecks = (userId: string): FetchUserDecksResult => {
  const [userDecks, setUserDecks] = useState<DeckEntity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDecks = async () => {
      setLoading(true);

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/decks?userId=${userId}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.log(errorData);
          setError(
            "Request to fetch user decks failed with status: " +
              response.status,
          );
          return;
        } else {
          const data = await response.json();
          setUserDecks(data);
        }
      } catch (error) {
        setError("Failed to fetch user decks");
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDecks();
    }
  }, [userId]);

  return { userDecks, loading, error };
};

export default useFetchUserDecks;
