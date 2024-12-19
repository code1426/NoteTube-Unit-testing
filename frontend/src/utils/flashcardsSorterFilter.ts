import { Flashcard } from "../types/flashcard.types";
import { options } from "../types/options.types";

const applySortingAndFilteringToFlashcards = (
  array: Flashcard[],
  options: options,
) => {
  let sortedFilteredarray: Flashcard[] = [...array];

  if (options.sortByDate === "latest") {
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a["created_at"] || "").getTime() || 0;
      const dateB = new Date(b["created_at"] || "").getTime() || 0;
      return dateB - dateA;
    });
  }

  if (options.sortByDate === "oldest") {
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a["created_at"] || "").getTime() || 0;
      const dateB = new Date(b["created_at"] || "").getTime() || 0;
      return dateA - dateB;
    });
  }

  // flashcards

  // sort flascard name by ascending
  if (options.sortByNames === "ascending") {
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["front"] || "";
      const frontB = b["front"] || "";
      return frontA.localeCompare(frontB);
    });
  }

  // sort flascard name by descending
  if (options.sortByNames === "descending") {
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["front"] || "";
      const frontB = b["front"] || "";

      return frontB.localeCompare(frontA);
    });
  }

  // filter flashcards by search
  if (options.searchByName !== "") {
    sortedFilteredarray = sortedFilteredarray.filter((content) => {
      const combinedcontent = content["front"] + content["back"];
      if (
        combinedcontent
          .toLowerCase()
          .includes(options.searchByName.toLowerCase())
      )
        return sortedFilteredarray;
    });
  }

  return sortedFilteredarray;
};
export default applySortingAndFilteringToFlashcards;
