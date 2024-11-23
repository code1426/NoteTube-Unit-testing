import React, { useState } from "react";
import { PiList, PiListNumbers, PiTrash, PiX } from "react-icons/pi";
import Spinner from "react-activity/dist/Spinner";
import useUpdateFlashcard from "../../hooks/Flashcards/useUpdateFlashcard";
import { Flashcard } from "../../types/flashcard.types";

interface EditCardModalProps extends Flashcard {
  onClose: () => void;
  onEdit: () => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({
  id,
  front,
  back,
  deckId,
  onClose,
  onEdit,
}) => {
  const { updateFlashcard, loading, error } = useUpdateFlashcard(id);
  const [activeField, setActiveField] = useState<"front" | "back">("front");
  const [newFront, setNewFront] = useState(front);
  const [newBack, setNewBack] = useState(back);

  const handleEditCard = async () => {
    const isEmpty: boolean = !newFront.trim() || !newBack.trim();

    if (isEmpty) {
      alert("Card front and back cannot be empty!");
      return;
    }

    const res = await updateFlashcard({
      id,
      front: newFront,
      back: newBack,
      deckId,
    });

    onEdit();
    window.location.reload();

    if (res.error) {
      console.error("Failed to update card:", error);
      alert("Failed to update card. Please try again.");
    }

    if (res.success) {
      onClose();
    }
  };

  const modifyText = (type: "bulleted" | "numbered") => {
    const currentText = activeField === "front" ? newFront : newBack;
    const formattedText = currentText
      .split("\n")
      .map((line, index) => {
        const cleanedLine = line.replace(/^(•|\d+\.)\s*/, "").trim();
        if (!cleanedLine) return "";
        return type === "bulleted"
          ? `• ${cleanedLine}`
          : `${index + 1}. ${cleanedLine}`;
      })
      .join("\n");

    if (activeField === "front") {
      setNewFront(formattedText);
    } else {
      setNewBack(formattedText);
    }
  };

  const clearText = () => {
    if (activeField === "front") {
      setNewFront("");
    } else {
      setNewBack("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-[600px] rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-3xl font-secondaryRegular">Edit Card</p>
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
            placeholder="Card Front"
            value={newFront}
            onChange={(e) => setNewFront(e.target.value)}
            onFocus={() => setActiveField("front")}
            disabled={loading}
          />
          <textarea
            className="p-3 border-b-2 border-[#03c04a] text-black text-xl resize-none"
            placeholder="Card Back"
            value={newBack}
            onChange={(e) => setNewBack(e.target.value)}
            onFocus={() => setActiveField("back")}
            disabled={loading}
          />
          <div className="editText text-gray-400 text-sm mt-2 flex justify-between">
            <div className="flex gap-2">
              <button
                className="p-2 text-black hover:bg-gray-200 rounded"
                onClick={() => modifyText("bulleted")}
              >
                <PiList size={40} />
              </button>
              <button
                className="p-2 text-black hover:bg-gray-200 rounded"
                onClick={() => modifyText("numbered")}
              >
                <PiListNumbers size={40} />
              </button>
            </div>
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
            onClick={handleEditCard}
            disabled={loading}
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              "Update Card"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCardModal;
