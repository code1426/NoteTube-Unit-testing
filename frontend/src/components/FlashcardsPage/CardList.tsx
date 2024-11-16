import React from "react";
import useFetchCards from "../../hooks/useFetchCards";
import Card from "./Card";

interface CardListProps {
  deckId: string;
}

const CardList: React.FC<CardListProps> = ({ deckId }) => {
  const { cards, loading } = useFetchCards(deckId);

  if (loading) return <p>Loading cards...</p>;

  return (
    <div>
      {cards.map((card) => (
        <Card
          key={card.id}
          cardFront={card.card_front}
          cardBack={card.card_back}
        />
      ))}
    </div>
  );
};

export default CardList;
