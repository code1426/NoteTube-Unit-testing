import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Card from "../components/FlashcardsPage/Card";
import useFetchCards from "../hooks/useFetchCards";
import { Card as CardType } from "../types/card.types";
import LoadingScreen from "../components/LoadingScreen";

const FlashcardsPage: React.FC = () => {
  const { deckId, deckName } = useParams<{
    deckId: string;
    deckName: string;
  }>();

  const { cards, loading } = useFetchCards(deckId);

  if (loading) return <LoadingScreen message="Loading cards..." />;

  return (
    <div>
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={true}
        isSectionTitleOnly={false}
        sectionTitle={deckName || "Untitled Deck"}
      />
      <div className="px-20">
        <div className="pb-20 text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
          Cards
        </div>
        <div className="space-y-5">
          {cards.length === 0 ? (
            <p className=" text-3xl text-center text-primaryRegular">
              No cards available.
            </p>
          ) : (
            cards.map((card: CardType) => (
              <Card
                key={card.id}
                cardFront={card.card_front}
                cardBack={card.card_back}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
