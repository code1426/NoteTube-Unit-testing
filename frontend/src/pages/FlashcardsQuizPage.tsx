import { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import QuizFlashcard from "../components/Flashcards/QuizFlashcard";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import ReturnButton from "../components/ReturnButton";
import toast, { Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";

const FlashcardsQuizPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const { flashcards, loading, error } = useFetchFlashcards(deckId!);
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

  if (error) {
    console.error(error);
    toast.error("Error fetching flashcards.");
  }

  const currentQuizItem = currentIndex + 1;
  const totalQuizItems = quizCards.length;

  const isSingleCard = quizCards.length === 1;

  return (
    <>
      <Toaster />
      <div>
        <div className="bg-white h-screen flex flex-col justify-center items-center p-5">
          <div className="absolute top-5 right-5">
            <ReturnButton />
          </div>
          {quizCards.length === 0 ? (
            <NoItemsContainerBox
              mainText="No flashcards available."
              subText=" Add a card to get started!"
              imageSrc="/src/assets/images/chillguy.png"
              altText="No Flashcards Available"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              {!isSingleCard && (
                <button
                  className="flex items-center gap-2 px-4 py-2 text-lg font-secondaryRegular font-medium hover:bg-blue-500 hover:text-gray-100 text-white bg-[#03c04a] rounded-full shadow-md hover:bg-green-700 active:scale-95 transition transform duration-150"
                  onClick={handlePrevious}
                >
                  <FaChevronLeft size={30} color="#ffffff" />
                  <span className="ml-2">Previous Card</span>
                </button>
              )}
              <div className="text-center mx-48">
                <QuizFlashcard
                  key={quizCards[currentIndex].id}
                  front={quizCards[currentIndex].front}
                  back={quizCards[currentIndex].back}
                />
                <div className="mt-6 bg-gray-200 px-4 py-2 rounded-full text-lg text-gray-700 font-semibold shadow-md">
                  Card {currentQuizItem} / {totalQuizItems}
                </div>
              </div>
              {!isSingleCard && (
                <button
                  className="flex items-center gap-2 px-4 py-2 text-lg font-medium hover:bg-blue-500 hover:text-gray-100 font-secondaryRegular text-white bg-[#03c04a] rounded-full shadow-md hover:bg-green-700 active:scale-95 transition transform duration-150"
                  onClick={handleNext}
                >
                  <span className="mr-2">Next Card</span>
                  <FaChevronRight size={30} color="#ffffff" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FlashcardsQuizPage;
