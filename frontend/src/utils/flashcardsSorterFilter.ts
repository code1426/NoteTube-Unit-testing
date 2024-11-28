import { Flashcard } from "../types/flashcard.types";
import { options } from "../types/options.types";

const applySortingAndFilteringToFlashcards = (array: Flashcard[], options: options) => {
  if (array.length === 0) return array
  let sortedFilteredarray: Flashcard[] = array;

  // will always filter by latest date
  console.log("(all) default sortByDate latest")
  sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
    const dateA = new Date(a['createdAt']!).getTime() || 0;
    const dateB = new Date(b['createdAt']!).getTime() || 0;
    return dateA - dateB;
  });

  if (options.sortByDate === "oldest") {
    console.log("(all) using sortByDate oldest")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a['createdAt']!).getTime() || 0;
      const dateB = new Date(b['createdAt']!).getTime() || 0;
      return dateB - dateA;
    });
  }

  // flashcards


  // sort flascard name by ascending
  if (options.sortByNames === "ascending") {
    console.log("(flashcards) using sortByName ascending")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["front"] || "";
      const frontB = b["front"] || "";
      return frontA.localeCompare(frontB)
    })
  }

  // sort flascard name by descending 
  if (options.sortByNames === "descending") {
    console.log("(flashcards) using sortByName descending")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["front"] || "";
      const frontB = b["front"] || "";
      return frontB.localeCompare(frontA)
    })
  }



  // filter flashcards by search
  if (options.searchByName !== "") {
    console.log("(flashcards) using searchBy")
    sortedFilteredarray = sortedFilteredarray.filter((content) => {
      const combinedcontent = content["front"] + content["back"]
      if (combinedcontent
        .toLowerCase()
        .includes(options
          .searchByName
          .toLowerCase()))
        return sortedFilteredarray
    })
  }

  return sortedFilteredarray
}
const testOptions: options = {
  sortByNames: "descending",
  sortByDate: '',
  searchByName: 'a'
}
const testFlashcardArray: Flashcard[] = [
  {
    "id": "6e4c3b32-c6c8-4bbc-ba52-5625207f1bd1",
    "front": "zsecond",
    "back": "asd",
    "deckId": "17098600-64c0-412c-a9b3-b7dba9f13157",
    "createdAt": "2024-11-26T04:24:53.152Z"
  },
  {
    "id": "a0b6cd11-2c19-46b2-bd12-823133b7cd37",
    "front": "alast",
    "back": "q",
    "deckId": "17098600-64c0-412c-a9b3-b7dba9f13157",
    "createdAt": "2024-12-26T14:24:03.969Z"
  },
  {
    "id": "6112b62e-05d5-4547-9167-36ba33a28986",
    "front": "cfirst",
    "back": "ewd",
    "deckId": "17098600-64c0-412c-a9b3-b7dba9f13157",
    "createdAt": "2024-10-26T14:23:49.000Z"
  }
]

console.log(applySortingAndFilteringToFlashcards(testFlashcardArray, testOptions))
export default applySortingAndFilteringToFlashcards