import React from "react";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Deck from "../components/MyDecks/Deck";
import LoadingScreen from "../components/LoadingScreen";
import UseUser from "../hooks/useUser";
import useFetchDecks from "../hooks/Decks/useFetchDecks";
import { Deck as DeckType } from "../types/deck.types";

const MyDecksPage: React.FC = () => {
  const { user, loading: userLoading } = UseUser();
  const { decks, loading: decksLoading } = useFetchDecks(user?.id || "");

  if (userLoading || !user || decksLoading) {
    return <LoadingScreen message="Loading decks..." />;
  }

  return (
    <div className="relative w-full h-auto min-h-screen p-4 bg-white">
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={false}
        sectionTitle="My Decks"
      />
      <div className="w-full flex px-20 gap-5">
        {decks.length === 0 ? (
          <p className="text-3xl text-center text-primaryRegular">
            No decks available.
          </p>
        ) : (
          decks.map((deck: DeckType) => (
            <Deck
              key={deck.id}
              id={deck.id}
              deck_name={deck.deck_name}
              card_count={deck.card_count}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default MyDecksPage;
