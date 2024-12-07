import { Link } from "react-router-dom";
import type { Deck } from "../../types/deck.types";
import ManageDeckDropdown from "./ManageDeckDropdown";
// import { Label } from "@radix-ui/react-select";
import { Label } from "../ui/label";

const DeckItem = ({ id, deckName, cardCount, userId, color }: Deck) => {
  return (
    <div className="w-full border border-gray-300 rounded-3xl bg-white hover:shadow-md shadow-gray-500 min-h-50">
      <div
        className="w-full h-16 rounded-t-3xl flex items-center justify-end px-4"
        style={{ backgroundColor: color }}
      >
        <ManageDeckDropdown
          id={id}
          deckName={deckName!}
          userId={userId!}
          color={color!}
        />
      </div>

      <Link
        to={`/flashcards/${id}`}
        state={{ deckName }}
        className="p-4 flex flex-col items-start justify-center space-y-2 rounded-b-[35px] "
      >
        <Label className="text-2xl block w-full truncate">{deckName}</Label>
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
