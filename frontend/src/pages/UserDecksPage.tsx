import React, { useState } from "react";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import DeckItem from "../components/Decks/DeckItem";
import LoadingScreen from "../components/LoadingScreen";
import UseUser from "../hooks/useUser";
import useFetchUserDecks from "../hooks/Decks/useFetchUserDecks";
import AddDeckModal from "../components/Decks/AddDeckModal";
import { toast, Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";

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
    console.error(error);
    toast.error("Error fetching user decks.");
  }

  const toggleAddDeckModal = () => {
    setAddFormVisible((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setAddFormVisible(false);
    window.location.reload();
  };

  return (
    <>
      <Toaster />
      <div className="overflow-auto scrollbar-custom h-screen relative bg-white">
        <Header isHomePage={false} />
        <SubHeader
          isFlashCardsPage={false}
          isSectionTitleOnly={false}
          hasAddButton={true}
          sectionTitle="My Decks"
          onAdd={toggleAddDeckModal}
        />
        <div className="px-3 xs:px-5 sm:px-10 md:px-14 lg:px-20 gap-5 grid xs:grid-cols-1 sm:grid-cols-1 sm-md:grid-cols-1 md:grid-cols-2 md-lg:grid-cols-2 lg:grid-cols-2 lg-xl:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 4xl:grid-cols-8 4k:grid-cols-10 xxl:grid-cols-12 auto-cols-auto">
          {isAddFormVisible && (
            <AddDeckModal
              userId={user.id!}
              onClose={toggleAddDeckModal}
              onSuccess={handleFormSuccess}
            />
          )}
          {userDecks!.length === 0 ? (
            <NoItemsContainerBox
              mainText="No decks available"
              subText="Add a deck using the + Add Deck button."
              imageSrc="/src/assets/images/chillguy.png"
              altText="No Cards Available"
            />
          ) : (
            userDecks!.map((deck) => (
              <DeckItem
                key={deck.id}
                id={deck.id}
                deckName={deck.deck_name}
                cardCount={deck.card_count}
                userId={deck.user_id}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default UserDecksPage;
