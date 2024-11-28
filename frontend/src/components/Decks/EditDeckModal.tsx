import React, { useState } from "react";
import { PiTrash, PiX } from "react-icons/pi";
import { Spinner } from "react-activity";
import useUpdateDeck from "../../hooks/Decks/useUpdateDeck";
import { Deck } from "../../types/deck.types";

interface EditDeckModalProps extends Deck {
  onClose: () => void;
  onEdit: () => void;
}

const EditDeckModal: React.FC<EditDeckModalProps> = ({
  id,
  deckName,
  userId,
  onClose,
  onEdit,
}) => {
  const { updateDeck, loading, error } = useUpdateDeck(id);
  const [newDeckName, setNewDeckName] = useState(deckName);

  const handleEditDeck = async () => {
    const isEmpty: boolean = !newDeckName.trim();

    if (isEmpty) {
      alert("Deck name cannot be empty!");
      return;
    }

    const res = await updateDeck({
      id: id,
      deckName: newDeckName,
      userId,
    });

    if (res.success) {
      onEdit();
      onClose();
      window.location.reload();
    } else {
      console.error("Failed to update deck:", error);
      alert("Failed to update deck. Please try again.");
    }
  };

  const clearText = () => setNewDeckName("");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-[600px] rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-3xl font-secondaryRegular">Edit Deck</p>
          <button
            className="text-black hover:bg-gray-200 rounded-full p-2"
            onClick={onClose}
          >
            <PiX size={30} />
          </button>
        </div>
        <div className="flex flex-col rounded-lg border-2 border-[#03c04a]">
          <textarea
            className="p-3 border-b-2 border-[#03c04a] text-black text-xl resize-none"
            placeholder="New Deck Name"
            value={newDeckName}
            onChange={(e) => setNewDeckName(e.target.value)}
            disabled={loading}
          />
          <div className="editText text-gray-400 text-sm mt-2 flex justify-between">
            <button
              className="p-2 text-black hover:bg-gray-200 rounded"
              onClick={clearText}
            >
              <PiTrash size={40} />
            </button>
          </div>
        </div>
        <div className="flex gap-4 justify-end mt-4">
          <button
            className="px-6 py-3 border-2 border-[#03c04a] text-black rounded-lg text-xl font-secondaryRegular"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-3 ${
              loading ? "bg-gray-300" : "bg-[#03c04a]"
            } text-white rounded-lg text-xl font-secondaryRegular`}
            onClick={handleEditDeck}
            disabled={loading}
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              "Update Deck"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditDeckModal;
