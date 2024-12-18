import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NoteWithVideos } from "../../types/note.types";
import { Link } from "react-router-dom";
import HistoryGeneratedVideoThumbnail from "./GeneratedVideoThumbnail";
import DeleteHistoryConfirmation from "./DeleteHistoryConfirmation";
import toast from "react-hot-toast";
import useDeleteNote from "@/hooks/Notes/useDeleteNote";
import { useIsMobile } from "@/hooks/use-mobile";
import { HoverCard, HoverCardTrigger } from "@radix-ui/react-hover-card";
import HoverHistoryNotesCard from "./HoverHistoryNotesCard";

const NotesHistoryCard = ({ id, title, videos, createdAt }: NoteWithVideos) => {
  const { deleteNote } = useDeleteNote(id);
  const isMobile = useIsMobile();

  const handleConfirmDelete = async () => {
    const result = await deleteNote();
    if (result.success) {
      toast.success("Note deleted successfully.");
    } else {
      toast.error("Error deleting note. Please try again.");
    }
  };

  return (
    <Card className="shadow-md w-full max-w-5xl">
      <CardHeader className="flex-row items-center justify-between border-b">
        <HoverCard>
          <HoverCardTrigger>
            <CardTitle className="flex-1 text-left">{title}</CardTitle>
          </HoverCardTrigger>
          <HoverHistoryNotesCard title={title} createdAt={createdAt} />
        </HoverCard>
        <div className="flex">
          <DeleteHistoryConfirmation id={id} onDelete={handleConfirmDelete} />
        </div>
      </CardHeader>
      <Link to={`/notes/${id}`}>
        <CardContent className="flex flex-row flex-wrap justify-center items-center mb-8 gap-8 p-4 select-none">
          {isMobile ? (
            <div className="w-full"></div>
          ) : (
            videos &&
            videos.length > 0 &&
            videos.map((video) => (
              <HistoryGeneratedVideoThumbnail
                key={video.videoId}
                thumbnailUrl={video.thumbnailUrl}
              />
            ))
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default NotesHistoryCard;
