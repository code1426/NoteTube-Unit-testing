import React, { useState } from "react";
import { PiList, PiListNumbers, PiTrash, PiX } from "react-icons/pi";
import Spinner from "react-activity/dist/Spinner";
import useUpdateCard from "../../hooks/Cards/useUpdateCard";

interface EditCardModalProps {
  cardId: string;
  cardFront: string;
  cardBack: string;
  onClose: () => void;
  onEdit: () => void;
}

const EditCardModal: React.FC<EditCardModalProps> = ({
  cardId,
  cardFront,
  cardBack,
  onClose,
  onEdit,
}) => {
  const [activeField, setActiveField] = useState<"front" | "back">("front");
  const [newCardFront, setNewCardFront] = useState(cardFront);
  const [newCardBack, setNewCardBack] = useState(cardBack);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEditCard = async () => {
    if (!newCardFront.trim() || !newCardBack.trim()) {
      alert("Card front and back cannot be empty!");
      return;
    }

    setIsSubmitting(true);

    try {
      await useUpdateCard(cardId, {
        cardFront: newCardFront,
        cardBack: newCardBack,
      });

      onEdit();
      window.location.reload();
    } catch (error) {
      console.error("Failed to update card:", error);
      alert("Failed to update card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modifyText = (type: "bulleted" | "numbered") => {
    const currentText = activeField === "front" ? newCardFront : newCardBack;
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
      setNewCardFront(formattedText);
    } else {
      setNewCardBack(formattedText);
    }
  };

  const clearText = () => {
    if (activeField === "front") {
      setNewCardFront("");
    } else {
      setNewCardBack("");
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
            value={newCardFront}
            onChange={(e) => setNewCardFront(e.target.value)}
            onFocus={() => setActiveField("front")}
            disabled={isSubmitting}
          />
          <textarea
            className="p-3 border-b-2 border-[#03c04a] text-black text-xl resize-none"
            placeholder="Card Back"
            value={newCardBack}
            onChange={(e) => setNewCardBack(e.target.value)}
            onFocus={() => setActiveField("back")}
            disabled={isSubmitting}
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
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-3 ${
              isSubmitting ? "bg-gray-300" : "bg-[#03c04a]"
            } text-white rounded-lg text-xl font-secondaryRegular`}
            onClick={handleEditCard}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
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
