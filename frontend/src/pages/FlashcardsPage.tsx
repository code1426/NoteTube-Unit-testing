import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Card from "../components/Flashcards/Flashcard";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import AddCardModal from "../components/Flashcards/AddFlashcardModal";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import { toast, Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";

const FlashcardsPage: React.FC = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards, loading, error } = useFetchFlashcards(deckId!);
  const location = useLocation();
  const deckName = location.state?.deckName || "Untitled Deck";

  const [isAddFormVisible, setAddFormVisible] = useState(false);

  const toggleAddForm = () => {
    setAddFormVisible((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setAddFormVisible(false);
    window.location.reload();
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
        <Header isHomePage={false} />
        <SubHeader
          isFlashCardsPage={true}
          isSectionTitleOnly={false}
          sectionTitle={deckName}
          onAdd={toggleAddForm}
          hasAddButton={true}
          deckId={deckId}
        />
        <div className="px-20">
          <div className="pb-20 text-black text-2xl md:text-3xl lg:text-2xl flex gap-3 font-secondaryRegular align-middle items-center">
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
            {flashcards!.length === 0 ? (
              <NoItemsContainerBox
                mainText="No cards available."
                subText="Add a card to the selected deck using the + Add Card button."
                imageSrc="/src/assets/images/chillguy.png"
                altText="No Cards Available"
              />
            ) : (
              flashcards!.map((flashcard: Flashcard) => (
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
    </>
  );
};

export default FlashcardsPage;
