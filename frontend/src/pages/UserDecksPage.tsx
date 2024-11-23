import React from "react";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import DeckItem from "../components/Decks/DeckItem";
import LoadingScreen from "../components/LoadingScreen";
import UseUser from "../hooks/useUser";
import useFetchUserDecks from "../hooks/Decks/useFetchUserDecks";
import type { Deck } from "../types/deck.types";

const UserDecksPage: React.FC = () => {
  const { user, loading: userLoading } = UseUser();
  const {
    userDecks,
    loading: decksLoading,
    error,
  } = useFetchUserDecks(user?.id || "");

  if (userLoading || !user || decksLoading) {
    return <LoadingScreen message="Loading decks..." />;
  }

  if (error) {
    return <p className="text-3xl text-center text-primaryRegular">{error}</p>;
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
        {userDecks!.length === 0 ? (
          <p className="text-3xl text-center text-primaryRegular">
            No decks available.
          </p>
        ) : (
          userDecks!.map((deck: Deck) => (
            <DeckItem
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

export default UserDecksPage;
