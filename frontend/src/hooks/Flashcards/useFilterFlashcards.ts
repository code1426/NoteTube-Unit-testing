import { useState, useEffect } from "react";
import { Flashcard } from "../../types/flashcard.types";
import applySortingAndFilteringToFlashcards from "../../utils/flashcardsSorterFilter";
import { options } from "../../types/options.types";

interface UseFilteredFlashcardsResult {
  filteredFlashcards: Flashcard[];
  setOptions: (newOptions: options) => void;
}

const useFilterFlashcards = (
  flashcards: Flashcard[] | null,
  initialOptions: options,
): UseFilteredFlashcardsResult => {
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);
  const [options, setOptions] = useState<options>(initialOptions);

  useEffect(() => {
    if (flashcards && flashcards.length > 0) {
      // Apply sorting and filtering logic to flashcards
      const sortedAndFiltered = applySortingAndFilteringToFlashcards(
        flashcards,
        options,
      );
      setFilteredFlashcards(sortedAndFiltered);
    }
  }, [flashcards, options]);

  console.log(filteredFlashcards);
  console.log(options);
  return { filteredFlashcards, setOptions }; // Return setOptions directly
};

export default useFilterFlashcards;
