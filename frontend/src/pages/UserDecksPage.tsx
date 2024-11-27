import React, { useState } from "react";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import DeckItem from "../components/Decks/DeckItem";
import LoadingScreen from "../components/LoadingScreen";
import UseUser from "../hooks/useUser";
import useFetchUserDecks from "../hooks/Decks/useFetchUserDecks";
import AddDeckModal from "../components/Decks/AddDeckModal";

const UserDecksPage: React.FC = () => {
  const { user, loading: userLoading } = UseUser();
  const {
    userDecks,
    loading: decksLoading,
    error,
  } = useFetchUserDecks(user?.id || "");
  const [isAddFormVisible, setAddFormVisible] = useState(false);

  if (userLoading || !user || decksLoading) {
    return <LoadingScreen message="Loading decks..." />;
  }

  if (error) {
    return <p className="text-3xl text-center text-primaryRegular">{error}</p>;
  }

  const toggleAddDeckModal = () => {
    setAddFormVisible((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setAddFormVisible(false);
    window.location.reload();
  };

  return (
    <div className="overflow-auto scrollbar-custom h-screen">
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={false}
        hasAddButton={true}
        sectionTitle="My Decks"
        onAdd={toggleAddDeckModal}
      />
      <div className="grid grid-cols-4 px-20 gap-5">
        {isAddFormVisible && (
          <AddDeckModal
            userId={user.id!}
            onClose={toggleAddDeckModal}
            onSuccess={handleFormSuccess}
          />
        )}
        {userDecks!.length === 0 ? (
          <p className="text-3xl text-center text-primaryRegular">
            No decks available.
          </p>
        ) : (
          userDecks!.map((deck) => (
            <DeckItem
              key={deck.id}
              id={deck.id}
              deck_name={deck.deck_name}
              card_count={deck.card_count}
              user_id={deck.user_id}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserDecksPage;
