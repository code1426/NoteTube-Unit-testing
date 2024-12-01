import { useState, useEffect } from "react";
import { DeckEntity } from "../../types/deck.types";
import applySortingAndFilteringToDecks from "../../utils/decksSorterFilter";
import { options } from "../../types/options.types";

interface UseFilteredDecksResult {
  filteredDecks: DeckEntity[];
  setOptions: React.Dispatch<React.SetStateAction<options>>;
}

const useFilterDecks = (
  decks: DeckEntity[] | null,
  initialOptions: options,
): UseFilteredDecksResult => {
  const [filteredDecks, setFilteredDecks] = useState<DeckEntity[]>([]);
  const [options, setOptions] = useState<options>(initialOptions);

  useEffect(() => {
    // Only filter if flashcards exist
    if (decks && decks.length > 0) {
      console.log("Filtering decks:", decks);
      console.log("Options for decks filtering:", options);

      const sortedAndFiltered = applySortingAndFilteringToDecks(decks, options);

      setFilteredDecks(sortedAndFiltered);
    } else {
      setFilteredDecks([]);
    }
  }, [decks, options]);

  return { filteredDecks, setOptions };
};

export default useFilterDecks;
