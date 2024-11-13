import React from "react";
import { PiDotsThreeCircle } from "react-icons/pi";

interface DeckProps {
  deckName: string;
  deckCardsCount: number;
}

const Deck: React.FC<DeckProps> = ({ deckName, deckCardsCount }) => {
  const manageDeck = () => {
    console.log("Selected deck: ", { deckName });
  };

  return (
    <div className="w-80 border border-black rounded-[35px] bg-white hover:shadow-lg">
      <div className="w-full h-20 bg-[#03c04a] rounded-t-[35px] flex items-center justify-end px-5">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          onClick={manageDeck}
        >
          <PiDotsThreeCircle size={30} color="white" />
        </button>
      </div>

      <div className="p-6 flex flex-col items-start justify-center space-y-2">
        <div className="text-3xl font-secondaryRegular">{deckName}</div>
        <div className="text-gray-500 text-lg font-primaryRegular">
          {deckCardsCount === 0
            ? "No cards"
            : `${deckCardsCount} card${deckCardsCount !== 1 ? "s" : ""}`}
        </div>
      </div>
    </div>
  );
};

export default Deck;
