import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import SubHeader from "../components/Header/Header";
import Card from "../components/Flashcards/Flashcard";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import { toast, Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";
import useFilterFlashcards from "../hooks/Flashcards/useFilterFlashcards";
import { options } from "../types/options.types";
import { Drawer } from "@/components/ui/drawer";
import AddFlashcardDrawer from "@/components/Flashcards/AddFlashcardDrawer";

const FlashcardsPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards, loading, error } = useFetchFlashcards(deckId!);
  const location = useLocation();
  const deckName = location.state?.deckName || "Untitled Deck";
  const [isAddFlashcardDrawerOpen, setIsAddFlashcardDrawerOpen] =
    useState(false);

  const [filterOptions, setFilterOptions] = useState<options>({
    sortByNames: "",
    sortByDate: "latest", // Default order
    searchByName: "",
  });

  const { filteredFlashcards, setOptions } = useFilterFlashcards(
    flashcards,
    filterOptions,
  );

  const toggleAddFlashcardDrawer = () => {
    setIsAddFlashcardDrawerOpen((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setIsAddFlashcardDrawerOpen(false);
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

  if (error) {
    console.error(error);
    toast.error("Error fetching flashcards.");
  }

  return (
    <>
      <Toaster />
      <div className="bg-white relative">
        <SubHeader
          isFlashCardsPage={true}
          isSectionTitleOnly={false}
          sectionTitle={deckName}
          onAdd={toggleAddFlashcardDrawer}
          hasAddButton={true}
          deckId={deckId}
          onApplyOptions={handleApplyFilters}
          onSearch={handleSearch}
        />
        <div className="px-20">
          <div className="pb-20 text-black text-2xl md:text-3xl lg:text-2xl flex gap-3 font-secondaryRegular align-middle items-center">
            Cards
          </div>
          <Drawer
            open={isAddFlashcardDrawerOpen}
            onOpenChange={setIsAddFlashcardDrawerOpen}
          >
            <AddFlashcardDrawer
              deckId={deckId!}
              onClose={toggleAddFlashcardDrawer}
              onSuccess={handleFormSuccess}
            />
          </Drawer>
          <div className="space-y-5">
            {filteredFlashcards.length === 0 ? (
              <NoItemsContainerBox
                mainText="No cards available."
                subText="Add a card to the selected deck using the + Add Card button."
                imageSrc="/src/assets/images/chillguy.png"
                altText="No Cards Available"
              />
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
    </>
  );
};

export default FlashcardsPage;
