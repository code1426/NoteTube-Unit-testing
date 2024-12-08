import { HoverCardContent } from "@/components/ui/hover-card";
import { PiCalendar } from "react-icons/pi";

interface HoverHistoryNotesCardProps {
  title: string;
  createdAt: string;
}

const HoverHistoryNotesCard: React.FC<HoverHistoryNotesCardProps> = ({
  title,
  createdAt,
}) => {
  const date = new Date(createdAt).getDate();
  const month = new Date(createdAt).toLocaleString("default", {
    month: "long",
  });

  return (
    <HoverCardContent className="bg-slate-100">
      <div className="space-y-2">
        <label className="text-sm font-semibold">Note: {title}</label>
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

export default HoverHistoryNotesCard;
