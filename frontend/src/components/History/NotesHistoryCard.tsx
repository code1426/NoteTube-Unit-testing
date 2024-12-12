import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FullNoteContent } from "../../types/note.types";
import { Link } from "react-router-dom";
import HistoryGeneratedVideoThumbnail from "./GeneratedVideoThumbnail";
import DeleteHistoryConfirmation from "./DeleteHistoryConfirmation";
import toast from "react-hot-toast";
import useDeleteNote from "@/hooks/Notes/useDeleteNote";
import { useIsMobile } from "@/hooks/use-mobile";

const NotesHistoryCard = ({ id, title, videos }: FullNoteContent) => {
  const { deleteNote, error } = useDeleteNote(id);
  const isMobile = useIsMobile();

  const handleConfirmDelete = async () => {
    const result = await deleteNote();
    if (result.success) {
      toast.success("Note deleted successfully.");
      window.location.reload();
    } else {
      toast.error("Error deleting note. Please try again.");
      console.error("Error deleting note:", error);
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="flex-row items-center justify-between border-b">
        <CardTitle className="flex-1 text-left">{title}</CardTitle>
        <div className="flex">
          <DeleteHistoryConfirmation id={id} onDelete={handleConfirmDelete} />
        </div>
      </CardHeader>
      <Link to={`/notes/${id}`}>
        <CardContent className="flex flex-row flex-wrap justify-start items-center mb-8 gap-8 p-4 select-none">
          {!videos ? (
            <></>
          ) : isMobile ? (
            <p className="text-gray-500 text-sm">
              Video previews are hidden on mobile. Tap on the deck to view them.
            </p>
          ) : (
            videos!.map((video) => (
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
