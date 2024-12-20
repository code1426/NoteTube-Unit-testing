import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteWithVideos } from "../../types/note.types";
import { useNavigate } from "react-router-dom";
import DeleteHistoryConfirmation from "./DeleteHistoryConfirmation";
import toast from "react-hot-toast";
import useDeleteNote from "@/hooks/Notes/useDeleteNote";
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { formatDistanceToNow } from "date-fns";

const NotesHistoryCard = ({ id, title, createdAt }: NoteWithVideos) => {
  const { deleteNote } = useDeleteNote(id);
  const navigate = useNavigate();

  const handleConfirmDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const result = await deleteNote();
    if (result.success) {
      toast.success("Note deleted successfully.");
    } else {
      toast.error("Error deleting note. Please try again.");
    }
  };

  const handleCardClick = () => {
    navigate(`/notes/${id}`);
  };

  return (
    <Card
      className="shadow-md w-full cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] dark:bg-dark-foreground"
      onClick={handleCardClick}
    >
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <div className="flex-1 min-w-0 pr-4 overflow-hidden">
          <HoverCard>
            <HoverCardTrigger asChild>
              <CardTitle
                className="text-left w-full text-lg font-semibold truncate"
                title={title}
              >
                {title}
              </CardTitle>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <p>{title}</p>
            </HoverCardContent>
          </HoverCard>
          <p className="text-sm text-muted-foreground mt-1">
            {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </p>
        </div>
        <div className="flex-shrink-0" onClick={(e) => e.stopPropagation()}>
          <DeleteHistoryConfirmation id={id} onDelete={handleConfirmDelete} />
        </div>
      </CardHeader>
    </Card>
  );
};

export default NotesHistoryCard;
