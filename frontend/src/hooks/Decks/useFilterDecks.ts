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
    // Only filter if decks exist
    if (decks && decks.length > 0) {
      const sortedAndFiltered = applySortingAndFilteringToDecks(decks, options);

      setFilteredDecks(sortedAndFiltered);
    } else {
      setFilteredDecks([]);
    }
  }, [decks, options]);

  return { filteredDecks, setOptions };
};

export default useFilterDecks;
