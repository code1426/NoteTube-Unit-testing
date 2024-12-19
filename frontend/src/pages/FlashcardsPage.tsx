import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "../components/Header/Header";
import type { Flashcard } from "../types/flashcard.types";
import { PiCards } from "react-icons/pi";
import LoadingScreen from "../components/LoadingScreen";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import { Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";
import useFilterFlashcards from "../hooks/Flashcards/useFilterFlashcards";
import { options } from "../types/options.types";

import FlashcardItem from "@/components/Flashcards/FlashcardItem";
import AddFlashcardDrawer from "@/components/Flashcards/AddFlashcardDrawer";
import AddFlashcardDialog from "@/components/Flashcards/AddFlashcardDialog";

import { useIsMobile } from "@/hooks/use-mobile";

import { Drawer } from "@/components/ui/drawer";
import { Dialog } from "@/components/ui/dialog";

const FlashcardsPage: React.FC = () => {
  const location = useLocation();
  const isMobile = useIsMobile();
  const deckName = location.state?.deckName || "Untitled Deck";
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards, loading } = useFetchFlashcards(deckId!);
  const [isAddFlashcardDrawerOpen, setIsAddFlashcardDrawerOpen] =
    useState(false);
  const [isAddFlashcardDialogOpen, setIsAddFlashcardDialogOpen] =
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

  const toggleAddFlashcard = () => {
    if (isMobile) setIsAddFlashcardDrawerOpen((prev) => !prev);
    else setIsAddFlashcardDialogOpen((prev) => !prev);
  };

  const toggleAddFlashcardDrawer = () => {
    setIsAddFlashcardDrawerOpen((prev) => !prev);
  };

  const toggleAddFlashcardDialog = () => {
    setIsAddFlashcardDialogOpen((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setIsAddFlashcardDrawerOpen(false);
  };

  const handleApplyFilters = (newOptions: options) => {
    setFilterOptions(newOptions);
    setOptions(newOptions);
  };

  const handleSearch = (searchText: string) => {
    setOptions((prev) => ({
      ...prev,
      searchByName: searchText,
    }));
  };

  if (loading) return <LoadingScreen message="Loading cards..." />;

  return (
    <>
      <Toaster />
      <div className="bg-white dark:bg-dark-background relative w-full px- flex flex-col items-center pb-14 scrollbar-custom">
        <Header
          isHomepage={false}
          isFlashCardsPage={true}
          isSectionTitleOnly={false}
          sectionTitle={"Flashcards"}
          onAdd={toggleAddFlashcard}
          hasAddButton={true}
          deckId={deckId}
          onApplyOptions={handleApplyFilters}
          onSearch={handleSearch}
        />

        <Dialog
          open={isAddFlashcardDialogOpen}
          onOpenChange={setIsAddFlashcardDialogOpen}
        >
          <AddFlashcardDialog
            deckId={deckId!}
            onClose={toggleAddFlashcardDialog}
            onSuccess={handleFormSuccess}
          />
        </Dialog>

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

        <div className="w-[90%]">
          <div className="pb-10 text-green-700 dark:text-green text-2xl md:text-4xl lg:text-4xl xl:text-3xl flex gap-3 font-primaryBold align-middle items-center">
            {deckName}
          </div>

          <div className="flex flex-col gap-4 scroll-auto">
            {filteredFlashcards.length === 0 ? (
              <NoItemsContainerBox
                mainText="No cards available."
                subText="Add a card to the selected deck using the + Add Card button."
                imageSrc="../chillguy.png"
                altText="No Cards Available"
              />
            ) : (
              filteredFlashcards.map((flashcard: Flashcard) => (
                <FlashcardItem
                  key={flashcard.id}
                  id={flashcard.id}
                  front={flashcard.front}
                  back={flashcard.back}
                  deckId={deckId!}
                  created_at={flashcard.created_at!}
                />
              ))
            )}
            <div>
              <Link
                to={`/quiz/${deckId}`}
                state={{ deckName }}
                className="flex px-8 py-2 fixed items-center justify-center bottom-0 left-0 right-0 bg-white"
              >
                <button
                  className={`flex md:hidden lg:hidden xl:hidden max-w-96 flex-row w-full h-12 items-center justify-center bg-green rounded-full text-white text-xl gap-4 active:bg-green_hover`}
                >
                  <PiCards size={30} /> Quiz
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FlashcardsPage;
