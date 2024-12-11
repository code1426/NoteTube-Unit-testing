import { HoverCardContent } from "@/components/ui/hover-card";
import { PiCalendar } from "react-icons/pi";

interface HoverFlashcardCardProps {
  created_at: string;
}

const HoverFlashcardCard: React.FC<HoverFlashcardCardProps> = ({
  created_at,
}) => {
  const date = new Date(created_at).getDate();
  const month = new Date(created_at).toLocaleString("default", {
    month: "long",
  });

  return (
    <HoverCardContent className="bg-slate-100 w-60">
      <div className="space-y-2">
        <label className="text-sm font-semibold">Flashcard</label>
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

export default HoverFlashcardCard;
