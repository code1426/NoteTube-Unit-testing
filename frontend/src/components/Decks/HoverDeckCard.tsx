import { HoverCardContent } from "@/components/ui/hover-card";
import { PiCalendar } from "react-icons/pi";

interface HoverDeckCardProps {
  deckName: string;
  createdAt: string;
}

const HoverDeckCard: React.FC<HoverDeckCardProps> = ({
  deckName,
  createdAt,
}) => {
  const date = new Date(createdAt).getDate();
  const month = new Date(createdAt).toLocaleString("default", {
    month: "long",
  });

  return (
    <HoverCardContent className="bg-slate-100 w-60 p-4 rounded-lg">
      <div className="space-y-2">
        <div className="text-sm font-semibold truncate max-w-full">
          <span>Deck:</span>
          <span className="ml-1" title={deckName}>
            {deckName}
          </span>
        </div>
        <div className="flex items-center pt-2">
          <PiCalendar className="mr-2 h-4 w-4 opacity-70" />
          <span className="text-xs text-muted-foreground">
            Created at {month} {date}
          </span>
        </div>
      </div>
    </HoverCardContent>
  );
};

export default HoverDeckCard;
