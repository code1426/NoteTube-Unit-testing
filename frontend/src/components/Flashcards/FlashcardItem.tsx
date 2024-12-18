import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Flashcard } from "../../types/flashcard.types";
import useDeleteFlashcard from "../../hooks/Flashcards/useDeleteFlashcard";
import toast from "react-hot-toast";
import DeleteFlashcardsConfirmation from "./DeleteFlashcardsConfirmation";
import EditFlashcardDialog from "./EditFlashcardDialog";
import { Separator } from "../ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import renderListContent from "@/utils/listRenderHandler";

const FlashcardItem = ({ id, front, back, deckId }: Flashcard) => {
  const { deleteFlashcard } = useDeleteFlashcard(id, deckId);
  const handleConfirmDelete = async () => {
    toast.promise(deleteFlashcard(), {
      loading: <p>Deleting flashcard...</p>,
      success: () => {
        return "Flashcard deleted successfully.";
      },
      error: (_error) => {
        return "Error deleting flashcard. Please try again.";
      },
    });
  };

  return (
    <>
      <TooltipProvider>
        <Card className="shadow-md p-2">
          {/* Header Section */}
          <CardHeader className="flex flex-row items-start justify-between pb-2">
            <CardTitle
              className="text-lg text-left w-full break-words whitespace-normal leading-relaxed"
              style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
            >
              {front}
            </CardTitle>
            <div className="mt-2 flex space-x-1">
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

          <Separator className="border" />
          <CardContent
            className="flex-1 py-[26.6px] max-h-48 overflow-y-auto"
            style={{
              wordBreak: "break-word",
              overflowWrap: "break-word",
            }}
          >
            {renderListContent(back)}
          </CardContent>
        </Card>
      </TooltipProvider>
    </>
  );
};

export default FlashcardItem;
