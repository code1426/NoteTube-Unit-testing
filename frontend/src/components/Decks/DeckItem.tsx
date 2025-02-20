import { useNavigate } from "react-router-dom";
import type { Deck } from "../../types/deck.types";
import ManageDeckDropdown from "./ManageDeckDropdown";
import { Label } from "../ui/label";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import HoverDeckCard from "./HoverDeckCard";

const DeckItem = ({
  id,
  deckName,
  cardCount,
  userId,
  color,
  createdAt,
}: Deck) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/flashcards/${id}`, { state: { deckName } });
  };

  return (
    <div
      onClick={handleClick}
      className="w-full border border-gray-300 rounded-3xl bg-white hover:shadow-md dark:bg-dark-foreground dark:border-gray-800 shadow-gray-500 min-h-50 select-none cursor-pointer"
    >
      <TooltipProvider>
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

        <div className="p-4 flex flex-col items-start justify-center space-y-2 rounded-b-[35px] ">
          <Label className="text-2xl block w-full truncate cursor-pointer">
            <HoverCard>
              <HoverCardTrigger>{deckName}</HoverCardTrigger>
              <HoverDeckCard
                key={id}
                deckName={deckName!}
                createdAt={createdAt!}
              />
            </HoverCard>
          </Label>
          <div className="text-gray-500 text-lg font-primaryRegular">
            {cardCount == 0
              ? "No cards"
              : `${cardCount} card${cardCount !== 1 ? "s" : ""}`}
          </div>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default DeckItem;
