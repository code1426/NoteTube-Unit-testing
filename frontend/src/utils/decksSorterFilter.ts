import { Deck } from "../types/deck.types";
import { options } from "../types/options.types";

const applySortingAndFilteringToDecks = (array: Deck[], options: options) => {
  if (array.length === 0) return array
  let sortedFilteredarray: Deck[] = array;

  // will always filter by latest date
  console.log("(decks) default sortByDate latest")
  sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
    const dateA = new Date(a['createdAt']!).getTime() || 0;
    const dateB = new Date(b['createdAt']!).getTime() || 0;
    return dateA - dateB;
  });

  if (options.sortByDate === "oldest") {
    console.log("(decks) using sortByDate oldest")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a['createdAt']!).getTime() || 0;
      const dateB = new Date(b['createdAt']!).getTime() || 0;
      return dateB - dateA;
    });
  }


  // decks

  // sort deck name by ascending
  if (options.sortByNames === "ascending") {
    console.log("(decks) using sortByName ascending")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["deckName"] || "";
      const frontB = b["deckName"] || "";
      return frontA.localeCompare(frontB)
    })
  }
  // sort deck name by descending
  if (options.sortByNames === "descending") {
    console.log("(decks) using sortByName descending")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["deckName"] || "";
      const frontB = b["deckName"] || "";
      return frontB.localeCompare(frontA)
    })
  }

  //  filter decks by search
  if (options.searchByName !== "") {
    console.log("(decks) using searchBy")
    sortedFilteredarray = sortedFilteredarray.filter((content) => {
      if (content["deckName"]
        .toLowerCase()
        .includes(options
          .searchByName
          .toLowerCase()))
        return sortedFilteredarray
    })
  }

  return sortedFilteredarray
}

export default applySortingAndFilteringToDecks