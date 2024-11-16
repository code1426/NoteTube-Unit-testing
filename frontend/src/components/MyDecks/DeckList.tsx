import React from "react";
import useFetchDecks from "../../hooks/useFetchDecks";
import Deck from "./Deck";
import { Deck as DeckType } from "../../types/deck.types";

const DeckList: React.FC = () => {
  const { decks, loading } = useFetchDecks();

  if (loading) return <p>Loading decks...</p>;

  return (
    <div>
      {decks.map((deck: DeckType) => (
        <Deck
          key={deck.id}
          id={deck.id}
          deck_name={deck.deck_name}
          card_count={deck.card_count}
        />
      ))}
    </div>
  );
};

export default DeckList;
