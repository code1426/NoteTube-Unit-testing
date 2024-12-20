import { DeckEntity } from "../types/deck.types";
import { options } from "../types/options.types";

const applySortingAndFilteringToDecks = (
  array: DeckEntity[],
  options: options,
) => {
  if (array.length === 0) return array;
  let sortedFilteredarray: DeckEntity[] = [...array];

  if (options.sortByDate === "latest") {
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a["created_at"]!).getTime() || 0;
      const dateB = new Date(b["created_at"]!).getTime() || 0;
      return dateB - dateA;
    });
  }

  if (options.sortByDate === "oldest") {
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a["created_at"]!).getTime() || 0;
      const dateB = new Date(b["created_at"]!).getTime() || 0;
      return dateA - dateB;
    });
  }

  // decks

  // sort deck name by ascending
  if (options.sortByNames === "ascending") {
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["deck_name"] || "";
      const frontB = b["deck_name"] || "";
      return frontA.localeCompare(frontB);
    });
  }
  // sort deck name by descending
  if (options.sortByNames === "descending") {
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["deck_name"] || "";
      const frontB = b["deck_name"] || "";
      return frontB.localeCompare(frontA);
    });
  }

  //  filter decks by search
  if (options.searchByName !== "") {
    sortedFilteredarray = sortedFilteredarray.filter((content) => {
      if (
        content["deck_name"]!.toLowerCase().includes(
          options.searchByName.toLowerCase(),
        )
      )
        return sortedFilteredarray;
    });
  }

  return sortedFilteredarray;
};

export default applySortingAndFilteringToDecks;
