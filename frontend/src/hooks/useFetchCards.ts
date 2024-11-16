import { useState, useEffect } from "react";
import { Card } from "../types/card.types";

interface UseFetchCardsResult {
  cards: Card[];
  loading: boolean;
}

const useFetchCards = (deckId: string): UseFetchCardsResult => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCards = async () => {
      const url = `http://localhost:3000/decks/${deckId}/cards`;
      try {
        const response = await fetch(url);
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
