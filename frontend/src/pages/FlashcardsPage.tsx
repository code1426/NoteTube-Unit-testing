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

  // State to handle add card modal visibility
  const [isAddFormVisible, setAddFormVisible] = useState(false);

  // Handling Filter options
  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "ascending", // Default sorting
    sortByDate: "", // Default order
    searchByName: "",
  });

  // Memoize filtered flashcards to prevent unnecessary recalculations
  const { filteredFlashcards } = useFilterFlashcards(flashcards, filterOptions);

  // Toggle Add Card Form
  const toggleAddForm = () => {
    setAddFormVisible((prev) => !prev);
  };

  // Callback for when a form is successfully submitted
  const handleFormSuccess = () => {
    setAddFormVisible(false);
    // Instead of reloading the page, refetch data or update state if necessary
  };

  const handleApplyFilters = (newOptions: options) => {
    setFilterOptions((prevOptions) => {
      // Only update if the new options are different from the current ones
      if (
        newOptions.sortByNames !== prevOptions.sortByNames ||
        newOptions.sortByDate !== prevOptions.sortByDate ||
        newOptions.searchByName !== prevOptions.searchByName
      ) {
        return newOptions;
      }
      return prevOptions; // Return the previous state if no change
    });
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
        onApplyOptions={handleApplyFilters}
      />
      <div className="px-20">
        <div className="pb-20 text-black text-2xl md:text-5xl lg:text-5xl flex gap-3 font-secondaryRegular align-middle items-center">
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
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPage;
