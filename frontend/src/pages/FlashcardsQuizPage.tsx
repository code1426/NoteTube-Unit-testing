import { useState, useEffect, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import useFetchFlashcards from "../hooks/Flashcards/useFetchFlashcards";
import type { Flashcard } from "../types/flashcard.types";
import LoadingScreen from "../components/LoadingScreen";
import toast, { Toaster } from "react-hot-toast";
import NoItemsContainerBox from "../components/NoItemsContainerBox";
import Header from "@/components/Header/Header";
import QuizFlashcard from "@/components/Flashcards/QuizFlashcard";

import useEmblaCarousel from "embla-carousel-react";
import Fade from "embla-carousel-fade";
import { Label } from "@/components/ui/label";

import { BiSkipPrevious, BiSkipNext } from "react-icons/bi";

const FlashcardsQuizPage = () => {
  const { deckId } = useParams<{ deckId: string }>();
  const location = useLocation();
  const deckName = location.state?.sectionTitle || location.state?.deckName;
  const { flashcards, loading, error } = useFetchFlashcards(deckId!);
  const [quizCards, setQuizCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Fade()]);

  const updateCurrentIndex = useCallback(() => {
    if (emblaApi) {
      const index = emblaApi.selectedScrollSnap();
      setCurrentIndex(index);
      setShowAnswer(false);
    }
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      emblaApi.on("select", updateCurrentIndex);
      emblaApi.reInit();
    }
  }, [emblaApi, updateCurrentIndex]);

  useEffect(() => {
    if (flashcards && flashcards.length > 0) {
      const shuffledCards = [...flashcards].sort(() => Math.random() - 0.5);
      setQuizCards(shuffledCards);
    }
  }, [flashcards]);

  const handleNext = () => {
    if (emblaApi) emblaApi.scrollNext();
  };

  const handlePrev = () => {
    if (emblaApi) emblaApi.scrollPrev();
  };

  if (loading) return <LoadingScreen message="Loading quiz..." />;

  if (error) {
    console.error(error);
    toast.error("Error fetching flashcards.");
    return null;
  }

  return (
    <div className="flex flex-col w-full items-center scrollbar-custom">
      <Toaster />
      <Header
        isHomepage={false}
        isSectionTitleOnly={false}
        isFlashCardsPage={false}
        sectionTitle="Quiz"
        hasAddButton={false}
      />
      <div className="flex flex-1 flex-col items-center justify-start w-5/6">
        {quizCards.length === 0 ? (
          <NoItemsContainerBox
            mainText="No flashcards available."
            subText=" Add a card to get started!"
            imageSrc="./chillguy.png"
            altText="No Flashcards Available"
          />
        ) : (
          <>
            <Label className="w-full flex justify-center py-4 mb-4 text-3xl font-secondaryRegular">
              {deckName}
            </Label>
            <div
              className="relative w-full md:max-w-5xl lg:max-w-5xl xl:max-w-5xl overflow-hidden rounded-xl"
              ref={emblaRef}
            >
              <div className="flex">
                {quizCards.map((card, index) => (
                  <div
                    key={card.id}
                    className="flex-shrink-0 w-full transition-transform duration-300"
                  >
                    <QuizFlashcard
                      front={card.front}
                      back={card.back}
                      isBackVisible={index === currentIndex && showAnswer}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="button-container w-full flex items-center justify-center gap-4 mt-8">
              <button
                onClick={handlePrev}
                className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                aria-label="Previous Card"
              >
                <BiSkipPrevious size={35} />
              </button>

              <button
                onClick={() => setShowAnswer((prev) => !prev)}
                className="py-2 w-48 transition-all rounded-full bg-green text-white hover:bg-green_hover text-sm md:text-lg flex items-center justify-center"
                aria-label="Show Answer"
              >
                <Label className="text-xl">
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </Label>
              </button>

              <button
                onClick={handleNext}
                className="w-12 h-12 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                aria-label="Next Card"
              >
                <BiSkipNext size={35} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FlashcardsQuizPage;
