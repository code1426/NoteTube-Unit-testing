import { useEffect, useState, useContext } from "react";
import { DeckEntity } from "../../types/deck.types";
import { DecksContext } from "@/context/Contexts";

interface FetchUserDecksResult {
  userDecks?: DeckEntity[] | null;
  loading: boolean;
  error?: string | null;
}

const useFetchUserDecks = (userId: string): FetchUserDecksResult => {
  const [decks, setDecks] = useState<DeckEntity[] | null>(null);
  const { setDecks: setContextDecks } = useContext(DecksContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        setLoading(true);
        if (!userId.trim()) {
          setLoading(false);
          setError("No user ID provided");
          return;
        }

        const response = await fetch(
          `${import.meta.env.VITE_BASE_API_URL}/decks?userId=${userId}`,
          {
            method: "GET",
          },
        );

        if (!response.ok) {
          setError(
            "Request to fetch user decks failed with status: " +
              response.status,
          );
          return;
        } else {
          const data = await response.json();
          setDecks(data);
          setContextDecks(data);
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
  }, [userId, setContextDecks]);

  return { loading, error, userDecks: decks };
};

export default useFetchUserDecks;
