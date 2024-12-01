import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import QuizFlashcard from "../components/Flashcards/QuizFlashcard";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import ReturnButton from "../components/ReturnButton";

const FlashcardsQuizPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards, loading } = useFetchFlashcards(deckId!);
  const [quizCards, setQuizCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (flashcards && flashcards.length > 0) {
      const shuffledCards = [...flashcards].sort(() => Math.random() - 1);
      setQuizCards(shuffledCards);
      setCurrentIndex(0);
    }
  }, [flashcards]);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : quizCards.length - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex < quizCards.length - 1 ? prevIndex + 1 : 0,
    );
  };

  if (loading) return <LoadingScreen message="Loading quiz..." />;

  const currentQuizItem = currentIndex + 1;
  const totalQuizItems = quizCards.length;

  const isSingleCard = quizCards.length === 1;

  return (
    <div>
      <div className="bg-white h-screen flex flex-col justify-center items-center p-5">
        <ReturnButton />
        {quizCards.length === 0 ? (
          <p className=" text-3xl text-primaryRegular">
            No flashcards available.
          </p>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            {/* Conditionally render the Previous button if more than 1 card */}
            {!isSingleCard && (
              <button
                className="flex items-center justify-center rounded-full hover:bg-gray-200 p-2 text-2xl font-secondaryRegular"
                onClick={handlePrevious}
              >
                <FaChevronLeft size={30} />
                <span className="ml-2">Previous Card</span>
              </button>
            )}
            <div className="text-center mx-48">
              <QuizFlashcard
                key={quizCards[currentIndex].id}
                front={quizCards[currentIndex].front}
                back={quizCards[currentIndex].back}
              />
              <p className="mt-4 text-2xl font-secondaryRegular">
                Card {currentQuizItem} / {totalQuizItems}
              </p>
            </div>
            {/* Conditionally render the Next button if more than 1 card */}
            {!isSingleCard && (
              <button
                className="flex items-center justify-center rounded-full hover:bg-gray-200 p-2 text-2xl font-secondaryRegular"
                onClick={handleNext}
              >
                <span className="mr-2">Next Card</span>
                <FaChevronRight size={30} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardsQuizPage;
