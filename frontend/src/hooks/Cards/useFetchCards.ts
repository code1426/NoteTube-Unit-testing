import { useState, useEffect } from "react";
import { Card } from "../../types/card.types";

interface UseFetchCardsResult {
  cards: Card[];
  loading: boolean;
}

const useFetchCards = (deckId: string | undefined): UseFetchCardsResult => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const API_URL = "http://localhost:3000";
        const response = await fetch(`${API_URL}/decks/${deckId}/cards`);
        const data: Card[] = await response.json();
        setCards(data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [deckId]);

  return { cards, loading };
};

export default useFetchCards;
