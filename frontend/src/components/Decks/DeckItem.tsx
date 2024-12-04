import { Link } from "react-router-dom";
import type { Deck } from "../../types/deck.types";
import ManageDeckDropdown from "./ManageDeckDropdown";

const DeckItem = ({ id, deckName, cardCount, userId }: Deck) => {
  return (
    <div className="w-64 max-w-72 border-2 border-gray-200 rounded-3xl bg-white hover:shadow-xl min-h-50">
      <div className="w-full h-20 bg-[#03c04a] rounded-t-3xl flex items-center justify-end px-5">
        <ManageDeckDropdown id={id} deckName={deckName} userId={userId} />
      </div>

      <Link
        to={`/flashcards/${id}`}
        state={{ deckName }}
        className="p-6 flex flex-col items-start justify-center space-y-2 hover:bg-gray-100 rounded-b-[35px] "
      >
        <div
          id="deckName"
          className="text-3xl block font-secondaryRegular max-w-52 truncate"
        >
          {deckName}
        </div>
        <div className="text-gray-500 text-lg font-primaryRegular">
          {cardCount === 0
            ? "No cards"
            : `${cardCount} card${cardCount !== 1 ? "s" : ""}`}
        </div>
      </Link>
    </div>
  );
};

export default DeckItem;
