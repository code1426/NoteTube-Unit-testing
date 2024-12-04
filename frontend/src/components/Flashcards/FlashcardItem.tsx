import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flashcard } from "../../types/flashcard.types";
import useDeleteFlashcard from "../../hooks/Flashcards/useDeleteFlashcard";
import toast from "react-hot-toast";
import DeleteFlashcardsConfirmation from "./DeleteFlashcardsConfirmation";
import EditFlashcardDialog from "./EditFlashcardDialog";

const FlashcardItem = ({ id, front, back, deckId }: Flashcard) => {
  const { deleteFlashcard, error } = useDeleteFlashcard(id);
  const handleConfirmDelete = async () => {
    const result = await deleteFlashcard();
    if (result.success) {
      toast.success("Flashcard deleted successfully.");
      window.location.reload();
    } else {
      toast.error("Error deleting flashcard. Please try again.");
      console.error("Error deleting flashcard:", error);
    }
  };
  return (
    <Card className="shadow-md">
      <CardHeader className="flex-row items-center justify-between border-b">
        <CardTitle className="flex-1 text-left">{front}</CardTitle>
        <div className="flex">
          <EditFlashcardDialog
            id={id}
            front={front}
            back={back}
            deckId={deckId}
          />
          <DeleteFlashcardsConfirmation
            id={id}
            onDelete={handleConfirmDelete}
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-[26.6px]">{back}</CardContent>
    </Card>
  );
};

export default FlashcardItem;
