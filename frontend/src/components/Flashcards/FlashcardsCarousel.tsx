import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import QuizFlashcard from "./QuizFlashcard";
import type { Flashcard } from "../../types/flashcard.types";

interface FlashcardsCarouselProps {
  quizCards: Flashcard[];
}

const FlashcardCarousel: React.FC<FlashcardsCarouselProps> = ({
  quizCards,
}) => {
  return (
    <Carousel className="w-[26.5rem]">
      <CarouselContent>
        {quizCards.map((_, currentIndex) => (
          <CarouselItem key={currentIndex}>
            <QuizFlashcard
              key={quizCards[currentIndex].id}
              front={quizCards[currentIndex].front}
              back={quizCards[currentIndex].back}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default FlashcardCarousel;
