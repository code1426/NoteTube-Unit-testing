import { useState } from "react";
import { PiDotsThreeCircle } from "react-icons/pi";
import { Link } from "react-router-dom";
import type { Deck } from "../../types/deck.types";
import ManageDeckMenu from "./ManageDeckMenu";

const DeckItem = ({ id, deckName, cardCount, userId }: Deck) => {
  const [isManageMenuOpen, setIsManageMenuOpen] = useState(false);

  const manageDeck = () => {
    setIsManageMenuOpen(true);
  };

  return (
    <div className="w-72 border border-black rounded-3xl bg-white hover:shadow-lg gap-2 min-h-60">
      <div className="w-full h-20 bg-[#03c04a] rounded-t-3xl flex items-center justify-end px-5">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          onClick={manageDeck}
        >
          <PiDotsThreeCircle size={30} color="white" />
        </button>
      </div>

      <Link
        to={`/flashcards/${id}`}
        state={{ deckName }}
        className="p-6 flex flex-col items-start justify-center space-y-2 hover:bg-gray-100 rounded-b-[35px] "
      >
        <div
          id="deckName"
          className="text-3xl block font-secondaryRegular max-w-64 truncate"
        >
          {deckName}
        </div>
        <div className="text-gray-500 text-lg font-primaryRegular">
          {cardCount === 0
            ? "No cards"
            : `${cardCount} card${cardCount !== 1 ? "s" : ""}`}
        </div>
      </Link>

      {isManageMenuOpen && (
        <ManageDeckMenu
          id={id}
          deckName={deckName}
          userId={userId}
          onClose={() => setIsManageMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default DeckItem;
