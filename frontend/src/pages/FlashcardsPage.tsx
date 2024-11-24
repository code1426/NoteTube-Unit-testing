import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import SubHeader from "../components/Header/SubHeader";
import Card from "../components/Flashcards/Flashcard";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import AddCardModal from "../components/Flashcards/AddFlashcardModal";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";

const FlashcardsPage: React.FC = () => {
  const { deckId, deckName } = useParams<{
    deckId: string;
    deckName: string;
  }>();

  const { flashcards, loading } = useFetchFlashcards(deckId!);
  const [isAddFormVisible, setAddFormVisible] = useState(false);

  const toggleAddForm = () => {
    setAddFormVisible((prev) => !prev);
  };

  const handleFormSuccess = () => {
    setAddFormVisible(false);
    window.location.reload(); // Reload to fetch the updated cards
  };

  if (loading) return <LoadingScreen message="Loading cards..." />;

  return (
    <div className="">
      <Header isHomePage={false} />
      <SubHeader
        isFlashCardsPage={true}
        isSectionTitleOnly={false}
        sectionTitle={deckName || "Untitled Deck"}
        onAdd={toggleAddForm}
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
          {flashcards!.length === 0 ? (
            <p className="text-3xl text-center text-primaryRegular">
              No cards available.
            </p>
          ) : (
            flashcards!.map((flashcard: Flashcard) => (
              <Card
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
