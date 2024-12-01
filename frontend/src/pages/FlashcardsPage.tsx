import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Card from "../components/Flashcards/Flashcard";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import AddCardModal from "../components/Flashcards/AddFlashcardModal";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import useFilterFlashcards from "../hooks/Flashcards/useFilterFlashcards";
import { options } from "../types/options.types";

const FlashcardsPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards, loading } = useFetchFlashcards(deckId!);
  const location = useLocation();
  const deckName = location.state?.deckName || "Untitled Deck";

  const [isAddFormVisible, setAddFormVisible] = useState(false);

  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest", // Default order
    searchByName: "",
  });

  const { filteredFlashcards, setOptions } = useFilterFlashcards(
    flashcards,
    filterOptions,
  );

  const toggleAddForm = () => {
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

  if (loading) return <LoadingScreen message="Loading cards..." />;

  return (
    <div className="bg-white relative">
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={true}
        isSectionTitleOnly={false}
        sectionTitle={deckName}
        onAdd={toggleAddForm}
        hasAddButton={true}
        deckId={deckId}
        onApplyOptions={handleApplyFilters}
        onSearch={handleSearch}
      />
      <div className="px-20">
        <div className="pb-20 text-black text-2xl md:text-5xl lg:text-4xl flex gap-3 font-secondaryRegular align-middle items-center">
          Cards
        </div>
        {isAddFormVisible && (
          <AddCardModal
            deckId={deckId!}
            onClose={toggleAddForm}
            onSuccess={handleFormSuccess}
          />
        )}
        <div className="space-y-5">
          {filteredFlashcards.length === 0 ? (
            <p className="text-3xl text-center text-primaryRegular">
              No cards available.
            </p>
          ) : (
            filteredFlashcards.map((flashcard: Flashcard) => (
              <Card
                key={flashcard.id}
                id={flashcard.id}
                front={flashcard.front}
                back={flashcard.back}
                deckId={flashcard.deckId}
                created_at={flashcard.created_at!}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
