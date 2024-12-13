import { useState, useEffect, useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  CarouselApi, // Import the correct API type
} from "../ui/carousel";

interface SectionCarouselProps {
  children: React.ReactNode[];
  duration?: number; // Time each slide stays visible (in ms)
}

const SectionCarousel = ({
  children,
  duration = 5000,
}: SectionCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideCount = children.length;
  const carouselApiRef = useRef<CarouselApi | null>(null); // Correct type for the ref

  // Update the current index automatically for autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, duration);

    return () => clearInterval(timer); // Clear the interval on unmount
  }, [duration, slideCount]);

  // Update the carousel to the new index when currentIndex changes
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
        setApi={(api) => (carouselApiRef.current = api)} // Save API reference
      >
        {/* Carousel Controls */}
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
              index === currentIndex ? "bg-green" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)} // Manually select slide
          />
        ))}
      </div>

      {/* Loading Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-green-300 border-2 border-black">
        <div
          className="h-full bg-green-500 transition-all duration-500 ease-linear"
          style={{
            width: `${((currentIndex + 1) / slideCount) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

export default SectionCarousel;
