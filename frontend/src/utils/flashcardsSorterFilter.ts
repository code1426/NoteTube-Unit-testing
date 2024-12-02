import { Flashcard } from "../types/flashcard.types";
import { options } from "../types/options.types";

const applySortingAndFilteringToFlashcards = (
  array: Flashcard[],
  options: options,
) => {
  let sortedFilteredarray: Flashcard[] = [...array];

  if (options.sortByDate === "latest") {
    console.log("(flashcards) sortByDate latest");
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a["created_at"] || "").getTime() || 0;
      const dateB = new Date(b["created_at"] || "").getTime() || 0;
      return dateB - dateA;
    });
  }

  if (options.sortByDate === "oldest") {
    console.log("(flashcards) using sortByDate oldest");
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a["created_at"] || "").getTime() || 0;
      const dateB = new Date(b["created_at"] || "").getTime() || 0;
      return dateA - dateB;
    });
  }

  // flashcards

  // sort flascard name by ascending
  if (options.sortByNames === "ascending") {
    console.log("(flashcards) using sortByName ascending");
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["front"] || "";
      const frontB = b["front"] || "";
      return frontA.localeCompare(frontB);
    });
  }

  // sort flascard name by descending
  if (options.sortByNames === "descending") {
    console.log("(flashcards) using sortByName descending");
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["front"] || "";
      const frontB = b["front"] || "";

      return frontB.localeCompare(frontA);
    });
  }

  // filter flashcards by search
  if (options.searchByName !== "") {
    console.log("(flashcards) using searchBy");
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
