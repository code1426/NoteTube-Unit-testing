import React, { useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import Header from "../components/Header/Header";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import { toast, Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";
import useFilterFlashcards from "../hooks/Flashcards/useFilterFlashcards";
import { options } from "../types/options.types";
import { Drawer } from "@/components/ui/drawer";
import AddFlashcardDrawer from "@/components/Flashcards/AddFlashcardDrawer";
import FlashcardItem from "@/components/Flashcards/FlashcardItem";
import { HoverCard, HoverCardTrigger } from "@/components/ui/hover-card";
import HoverFlashcardCard from "@/components/Flashcards/HoverFlashcardCard";
import { PiCards } from "react-icons/pi";

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
    setOptions((prev) => ({
      ...prev,
      searchByName: searchText,
    }));
  };

  if (loading || !flashcards)
    return <LoadingScreen message="Loading cards..." />;

  if (error) {
    console.error(error);
    toast.error("Error fetching flashcards.");
  }

  return (
    <>
      <Toaster />
      <div className="bg-white relative w-full px- flex flex-col items-center pb-14">
        <Header
          isHomepage={false}
          isFlashCardsPage={true}
          isSectionTitleOnly={false}
          sectionTitle={deckName}
          onAdd={toggleAddFlashcardDrawer}
          hasAddButton={true}
          deckId={deckId}
          onApplyOptions={handleApplyFilters}
          onSearch={handleSearch}
        />
        <div className="w-[90%]">
          <div className="pb-10 text-black text-2xl md:text-3xl lg:text-2xl flex gap-3 font-secondaryRegular align-middle items-center">
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
          <div className="flex flex-col gap-4 scroll-auto">
            {filteredFlashcards.length === 0 ? (
              <NoItemsContainerBox
                mainText="No cards available."
                subText="Add a card to the selected deck using the + Add Card button."
                imageSrc="/src/assets/images/chillguy.png"
                altText="No Cards Available"
              />
            ) : (
              filteredFlashcards.map((flashcard: Flashcard) => (
                <HoverCard>
                  <HoverCardTrigger className="">
                    <FlashcardItem
                      key={flashcard.id}
                      id={flashcard.id}
                      front={flashcard.front}
                      back={flashcard.back}
                      deckId={flashcard.deckId}
                      created_at={flashcard.created_at!}
                    />
                  </HoverCardTrigger>
                  <HoverFlashcardCard
                    key={flashcard.id}
                    created_at={flashcard.created_at!}
                  />
                </HoverCard>
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
