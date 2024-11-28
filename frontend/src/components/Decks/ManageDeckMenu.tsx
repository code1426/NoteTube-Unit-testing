import { PiTrash, PiPencil, PiX } from "react-icons/pi";
import EditDeckModal from "./EditDeckModal";
import DeleteDeckModal from "./DeleteDeckModal";
import { useState } from "react";
import useDeleteDeck from "../../hooks/Decks/useDeleteDeck";
import { Deck } from "../../types/deck.types";

interface ManageDeckMenuProps extends Deck {
  onClose: () => void;
}

const ManageDeckMenu = ({
  id,
  deckName,
  userId,
  onClose,
}: ManageDeckMenuProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { deleteDeck, error } = useDeleteDeck(id);

  const handleConfirmDelete = async () => {
    const result = await deleteDeck();
    if (result) {
      window.location.reload();
    } else {
      console.error("Error deleting deck:", error);
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="relative -mt-48 -m-20 flex flex-col bg-opacity-50 justify-center items-center z-10">
        <div className="bg-white border-2 border- w-60 rounded-lg p-6 shadow-lg flex flex-col">
          <div className="flex justify-between items-center w-full mb-4 border-b-2 border-[#03c04a] p-2">
            <h2 className="text-lg font-bold font-secondaryRegular">
              Manage Deck
            </h2>
            <button onClick={onClose}>
              <PiX
                size={24}
                color="grey"
                className="rounded-full hover:bg-gray-300"
              />
            </button>
          </div>
          <div className="flex flex-col">
            <button
              className="bg-green-500 px-4 py-2 rounded-lg mb-2 hover:bg-green-700 flex items-center"
              onClick={() => setIsEditModalOpen(true)}
            >
              <PiPencil size={20} className="mr-2" /> Edit Deck
            </button>
            <button
              className="bg-gray-100 px-4 py-2 rounded-lg hover:bg-red-400 flex items-center"
              onClick={() => setIsDeleteModalOpen(true)}
            >
              <PiTrash size={20} className="mr-2" /> Delete Deck
            </button>
          </div>
        </div>
      </div>
      {isEditModalOpen && (
        <EditDeckModal
          id={id}
          deckName={deckName}
          userId={userId}
          onClose={() => setIsEditModalOpen(false)}
          onEdit={() => setIsEditModalOpen(false)}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteDeckModal
          id={id}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirmDelete={handleConfirmDelete}
        />
      )}
    </>
  );
};

export default ManageDeckMenu;
