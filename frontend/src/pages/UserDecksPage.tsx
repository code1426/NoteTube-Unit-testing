import React, { useState } from "react";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import DeckItem from "../components/Decks/DeckItem";
import LoadingScreen from "../components/LoadingScreen";
import UseUser from "../hooks/useUser";
import useFetchUserDecks from "../hooks/Decks/useFetchUserDecks";
import AddDeckModal from "../components/Decks/AddDeckModal";
import useFilterDecks from "../hooks/Decks/useFilterDecks";
import { options } from "../types/options.types";
import { DeckEntity } from "../types/deck.types";

const UserDecksPage: React.FC = () => {
  const { user, loading: userLoading } = UseUser();
  const {
    userDecks,
    loading: decksLoading,
    error,
  } = useFetchUserDecks(user?.id || "");
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest", // Default order
    searchByName: "",
  });
  const { filteredDecks, setOptions } = useFilterDecks(
    userDecks,
    filterOptions,
  );

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

  const handleApplyFilters = (newOptions: options) => {
    setFilterOptions(newOptions);
    setOptions(newOptions);
  };

  const handleSearch = (searchText: string) => {
    console.log("search", searchText);
    setOptions((prev) => ({
      ...prev,
      searchByName: searchText,
    }));
  };

  return (
    <div className="overflow-auto scrollbar-custom h-screen relative bg-white">
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={false}
        isSectionTitleOnly={false}
        hasAddButton={true}
        sectionTitle="My Decks"
        onAdd={toggleAddDeckModal}
        onApplyOptions={handleApplyFilters}
        onSearch={handleSearch}
      />
      <div className="grid grid-cols-4 px-20 gap-5">
        {isAddFormVisible && (
          <AddDeckModal
            userId={user.id!}
            onClose={toggleAddDeckModal}
            onSuccess={handleFormSuccess}
          />
        )}
        {filteredDecks?.length === 0 ? (
          <p className="text-3xl text-center text-primaryRegular">
            No decks available.
          </p>
        ) : (
          filteredDecks!.map((deck: DeckEntity) => (
            <DeckItem
              key={deck.id}
              id={deck.id}
              deckName={deck.deck_name}
              cardCount={deck.card_count}
              userId={deck.user_id}
              createdAt={deck.created_at}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserDecksPage;
