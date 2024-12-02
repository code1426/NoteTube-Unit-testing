import { useState, useEffect } from "react";
import { Flashcard } from "../../types/flashcard.types";
import applySortingAndFilteringToFlashcards from "../../utils/flashcardsSorterFilter";
import { options } from "../../types/options.types";

interface UseFilteredFlashcardsResult {
  filteredFlashcards: Flashcard[];
  setOptions: React.Dispatch<React.SetStateAction<options>>;
}

const useFilterFlashcards = (
  flashcards: Flashcard[] | null,
  initialOptions: options,
): UseFilteredFlashcardsResult => {
  const [filteredFlashcards, setFilteredFlashcards] = useState<Flashcard[]>([]);
  const [options, setOptions] = useState<options>(initialOptions);

  useEffect(() => {
    // Only filter if flashcards exist
    if (flashcards && flashcards.length > 0) {
      const sortedAndFiltered = applySortingAndFilteringToFlashcards(
        flashcards,
        options,
      );

      setFilteredFlashcards(sortedAndFiltered);
    } else {
      setFilteredFlashcards([]);
    }
  }, [flashcards, options]);

  return { filteredFlashcards, setOptions };
};

export default useFilterFlashcards;
