import { Flashcard } from "../../types/flashcard.types";
import useDeleteFlashcard from "../../hooks/Flashcards/useDeleteFlashcard";
import toast from "react-hot-toast";
import DeleteFlashcardsConfirmation from "./DeleteFlashcardsConfirmation";
import EditFlashcardDialog from "./EditFlashcardDialog";

const Card = ({ id, front, back, deckId }: Flashcard) => {
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
    <div className="p-5 flex flex-col rounded-lg border-4 border-[#03c04a]">
      <div className="flex justify-between text-2xl font-secondaryRegular mb-4">
        <div className="truncate">{front}</div>
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
      </div>
      <div className="flex border-t-2 border-gray-300 mb-3"></div>
      <div className="flex justify-between text-2xl font-secondaryRegular text-gray-700">
        <div className="break-words">{back}</div>
      </div>

      {/* {isEditModalOpen && (
        <EditCardModal
          id={id}
          front={front}
          back={back}
          deckId={deckId}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={() => setIsEditModalOpen(false)}
        />
      )} */}
    </div>
  );
};

export default Card;
