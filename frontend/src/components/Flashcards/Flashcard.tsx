import { useState } from "react";
import { PiPencil, PiTrash } from "react-icons/pi";
import DeleteCardModal from "./DeleteFlashcardModal";
import EditCardModal from "./EditFlashcardModal";
import { Flashcard } from "../../types/flashcard.types";
import useDeleteFlashcard from "../../hooks/Flashcards/useDeleteFlashcard";

const Card = ({ id, front, back, deckId }: Flashcard) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { deleteFlashcard, error } = useDeleteFlashcard(id);

  const handleEditCard = () => {
    setIsEditModalOpen(true);
  };

  const handleDeleteCard = () => {
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    const result = await deleteFlashcard();
    if (result.success) {
      window.location.reload();
    } else {
      console.error("Error deleting flashcard:", error);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="p-5 rounded-lg border-4 border-[#03c04a] flex flex-col relative">
      <div className="flex justify-between text-2xl font-secondaryRegular mb-4">
        <div>{front}</div>
        <div className="flex">
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={handleEditCard}
          >
            <PiPencil size={30} />
          </button>
          <button
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200"
            onClick={handleDeleteCard}
          >
            <PiTrash size={30} />
          </button>
        </div>
      </div>
      <div className="w-full border-t-2 border-gray-300 mb-3"></div>
      <div className="text-2xl flex flex-col text-left font-secondaryRegular text-gray-700">
        {back}
      </div>

      {isEditModalOpen && (
        <EditCardModal
          id={id}
          front={front}
          back={back}
          deckId={deckId}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={() => setIsEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteCardModal
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
};

export default Card;
