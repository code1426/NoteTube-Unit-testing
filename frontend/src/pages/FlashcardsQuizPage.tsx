import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import toast, { Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";
import FlashcardCarousel from "@/components/Flashcards/FlashcardsCarousel";
import Header from "@/components/Header/Header";

const FlashcardsQuizPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards, loading, error } = useFetchFlashcards(deckId!);
  const [quizCards, setQuizCards] = useState<Flashcard[]>([]);

  useEffect(() => {
    if (flashcards && flashcards.length > 0) {
      const shuffledCards = [...flashcards].sort(() => Math.random() - 1);
      setQuizCards(shuffledCards);
    }
  }, [flashcards]);

  if (loading) return <LoadingScreen message="Loading quiz..." />;

  if (error) {
    console.error(error);
    toast.error("Error fetching flashcards.");
  }

  return (
    <>
      <Toaster />
      <div className="w-full">
        <Header
          isHomepage={false}
          isSectionTitleOnly={false}
          isFlashCardsPage={false}
          sectionTitle="Quiz"
          hasAddButton={false}
        />
        <div className="bg-white w-full h-screen flex flex-col justify-center items-center p-5">
          {quizCards.length === 0 ? (
            <NoItemsContainerBox
              mainText="No flashcards available."
              subText=" Add a card to get started!"
              imageSrc="/src/assets/images/chillguy.png"
              altText="No Flashcards Available"
            />
          ) : (
            <FlashcardCarousel quizCards={quizCards} />
          )}
        </div>
      </div>
    </>
  );
};

export default FlashcardsQuizPage;
