import { Options } from "../types/options";

const applySortingAndFiltering = (array: any[], options: Options, isDeck: Boolean) => {
  if (array.length === 0) return array
  let sortedFilteredarray: any[] = array;
  // all 
  // sort by date
  // will always filter by latest date
  console.log("(all) default sortByDate latest")
  sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
    const dateA = new Date(a['created_at']).getTime() || 0;
    const dateB = new Date(b['created_at']).getTime() || 0;
    return dateA - dateB;
  });

  if (options.sortByDate === "oldest") {
    console.log("(all) using sortByDate oldest")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const dateA = new Date(a['created_at']).getTime() || 0;
      const dateB = new Date(b['created_at']).getTime() || 0;
      return dateB - dateA;
    });
  }

  // flashcards


  // sort flascard name by ascending
  if (options.sortByNames === "ascending" && isDeck === false) {
    console.log("(flashcards) using sortByName ascending")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["front"] || "";
      const frontB = b["front"] || "";
      return frontA.localeCompare(frontB)
    })
  }

  // sort flascard name by descending 
  if (options.sortByNames === "descending" && isDeck === false) {
    console.log("(flashcards) using sortByName descending")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["front"] || "";
      const frontB = b["front"] || "";
      return frontB.localeCompare(frontA)
    })
  }



  // filter flashcards by search
  if (options.searchByName !== "" && isDeck === false) {
    console.log("(flashcards) using searchBy")
    sortedFilteredarray = sortedFilteredarray.filter((content) => {
      content = content["front"] + content["back"]
      if (content
        .toLowerCase()
        .includes(options
          .searchByName
          .toLowerCase()))
        return sortedFilteredarray
    })
  }

  // decks

  // sort deck name by ascending
  if (options.sortByNames === "ascending" && isDeck === true) {
    console.log("(decks) using sortByName ascending")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["deck_name"] || "";
      const frontB = b["deck_name"] || "";
      return frontA.localeCompare(frontB)
    })
  }
  // sort deck name by descending
  if (options.sortByNames === "descending" && isDeck === true) {
    console.log("(decks) using sortByName ascending")
    sortedFilteredarray = sortedFilteredarray.sort((a, b) => {
      const frontA = a["deck_name"] || "";
      const frontB = b["deck_name"] || "";
      return frontB.localeCompare(frontA)
    })
  }

  //  filter decks by search
  if (options.searchByName !== "" && isDeck === true) {
    console.log("(decks) using searchBy")
    sortedFilteredarray = sortedFilteredarray.filter((content) => {
      content = content["deck_name"]
      if (content
        .toLowerCase()
        .includes(options
          .searchByName
          .toLowerCase()))
        return sortedFilteredarray
    })
  }

  return sortedFilteredarray
}

export default applySortingAndFiltering