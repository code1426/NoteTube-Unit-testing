import { useEffect, useState } from "react";

const useFetchDecks = (userId: string) => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const API_URL = "http://localhost:3000";
        const response = await fetch(`${API_URL}/decks?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setDecks(data);
        } else {
          console.error("Failed to fetch decks");
        }
      } catch (error) {
        console.error("Error fetching decks:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchDecks();
    }
  }, [userId]);

  return { decks, loading };
};

export default useFetchDecks;
