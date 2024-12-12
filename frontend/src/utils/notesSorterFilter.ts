import { FullNoteContent } from "@/types/note.types";

import { options } from "../types/options.types";

const applySortingAndFilteringToNotes = (
  array: FullNoteContent[],
  options: options,
) => {
  if (array.length === 0) return array;
  let sortedFilteredarray: FullNoteContent[] = [...array];

  if (options.sortByDate === "latest") {
    console.log("(notes) sortByDate latest");
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a["createdAt"]!).getTime() || 0;
      const dateB = new Date(b["createdAt"]!).getTime() || 0;
      return dateB - dateA;
    });
  }

  if (options.sortByDate === "oldest") {
    console.log("(notes) using sortByDate oldest");
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a["createdAt"]!).getTime() || 0;
      const dateB = new Date(b["createdAt"]!).getTime() || 0;
      return dateA - dateB;
    });
  }

  // notes

  // sort deck name by ascending
  if (options.sortByNames === "ascending") {
    console.log("(notes) using sortByName ascending");
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["title"] || "";
      const frontB = b["title"] || "";
      return frontA.localeCompare(frontB);
    });
  }
  // sort deck name by descending
  if (options.sortByNames === "descending") {
    console.log("(notes) using sortByName descending");
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["title"] || "";
      const frontB = b["title"] || "";
      return frontB.localeCompare(frontA);
    });
  }

  //  filter notes by search
  if (options.searchByName !== "") {
    console.log("(notes) using searchBy");
    sortedFilteredarray = sortedFilteredarray.filter((content) => {
      if (
        content["title"]
          .toLowerCase()
          .includes(options.searchByName.toLowerCase())
      )
        return sortedFilteredarray;
    });
  }

  return sortedFilteredarray;
};

export default applySortingAndFilteringToNotes;
