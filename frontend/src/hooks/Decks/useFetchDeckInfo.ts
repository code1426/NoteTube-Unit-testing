import { useState, useEffect } from "react";

interface DeckInfo {
  id: string;
  name: string;
}

interface UseFetchDeckInfoResult {
  deckInfo: DeckInfo | null;
  loading: boolean;
}

const useFetchDeckInfo = (
  deckId: string | undefined,
): UseFetchDeckInfoResult => {
  const [deckInfo, setDeckInfo] = useState<DeckInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDeckInfo = async () => {
      try {
        const API_URL = "http://localhost:3000";
        const response = await fetch(`${API_URL}/decks`);
        const data: DeckInfo = await response.json();
        setDeckInfo(data);
      } catch (error) {
        console.error("Error fetching deck info:", error);
      } finally {
        setLoading(false);
      }
    };

    if (deckId) fetchDeckInfo();
  }, [deckId]);

  return { deckInfo, loading };
};

export default useFetchDeckInfo;
