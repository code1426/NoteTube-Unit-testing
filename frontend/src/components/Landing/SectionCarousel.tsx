import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi,
} from "../ui/carousel";

interface SectionCarouselProps {
  children: React.ReactNode[];
  duration?: number;
}

const SectionCarousel = ({
  children,
  duration = 5000,
}: SectionCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = children.length;
  const carouselApiRef = useRef<CarouselApi | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, duration);

    return () => clearInterval(timer);
  }, [duration, slideCount]);

  useEffect(() => {
    if (carouselApiRef.current) {
      carouselApiRef.current.scrollTo(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        opts={{ loop: true }}
        aria-live="polite"
        setApi={(api) => (carouselApiRef.current = api)}
      >
        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2" />

        <CarouselContent>
          {children.map((child, index) => (
            <CarouselItem key={index}>
              <div className="flex-shrink-0 w-full">{child}</div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {children.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-green" : "bg-gray-300"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionCarousel;
