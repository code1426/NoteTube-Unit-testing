import { useState } from "react";
import { PiTrash, PiX } from "react-icons/pi";
import { Spinner } from "react-activity";
import useCreateDeck from "../../hooks/Decks/useCreateDeck";

interface AddDeckModalProps {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDeckModal = ({ userId, onClose, onSuccess }: AddDeckModalProps) => {
  const { createDeck, loading } = useCreateDeck(userId);
  const [deckName, setDeckName] = useState("");

  const handleCreateDeck = async () => {
    if (!deckName) {
      alert("Deck Name is required");
      return;
    }

    const result = await createDeck({
      id: "",
      deckName: deckName,
      userId: userId,
    });

    if (result.error) {
      alert("Failed to create deck. Please try again.");
      return;
    }

    if (result.success) {
      setDeckName("");
      onSuccess();
      onClose();
    }
  };

  const clearText = () => {
    setDeckName("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-[600px] rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-3xl font-secondaryRegular">Add New Deck</p>
          <button
            className="text-black hover:bg-gray-200 rounded-full p-2"
            onClick={onClose}
          >
            <PiX size={30} />
          </button>
        </div>
        <div className="flex flex-col rounded-lg border-2 border-[#03c04a]">
          <input
            className="p-3 border-b-2 border-[#03c04a] text-black text-xl"
            placeholder="Deck Name"
            value={deckName}
            onChange={(e) => setDeckName(e.target.value)}
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
            onClick={handleCreateDeck}
            disabled={loading}
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              "Add Deck"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddDeckModal;
