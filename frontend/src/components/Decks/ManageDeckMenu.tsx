import { PiX } from "react-icons/pi";
import useDeleteDeck from "../../hooks/Decks/useDeleteDeck";
import { Deck } from "../../types/deck.types";
import toast from "react-hot-toast";
import DeleteDeckConfirmation from "./DeleteDeckConfirmation";
import EditDeckDialog from "./EditDeckDialog";

interface ManageDeckMenuProps extends Deck {
  onClose: () => void;
}

const ManageDeckMenu = ({
  id,
  deckName,
  userId,
  onClose,
}: ManageDeckMenuProps) => {
  const { deleteDeck, error } = useDeleteDeck(id);

  const handleConfirmDelete = async () => {
    const result = await deleteDeck();
    if (result.success) {
      toast.success("Deck deleted successfully.");
      window.location.reload();
    } else {
      console.error("Error deleting deck:", error);
      toast.error("Error deleting deck.");
    }
  };

  return (
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
          <EditDeckDialog id={id} deckName={deckName} userId={userId} />
          <DeleteDeckConfirmation id={id} onDelete={handleConfirmDelete} />
        </div>
      </div>
    </div>
  );
};

export default ManageDeckMenu;
