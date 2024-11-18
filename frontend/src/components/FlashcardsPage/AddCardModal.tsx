import React, { useState } from "react";
import { PiList, PiListNumbers, PiTrash, PiX } from "react-icons/pi";
import useCreateCard from "../../hooks/Cards/useCreateCard";
import Spinner from "react-activity/src/Spinner/Spinner";

interface AddCardModalProps {
  deckId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddCardModal: React.FC<AddCardModalProps> = ({
  deckId,
  onClose,
  onSuccess,
}) => {
  const [activeField, setActiveField] = useState<"front" | "back">("front");
  const [cardFront, setCardFront] = useState("");
  const [cardBack, setCardBack] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddCard = async () => {
    if (!cardFront.trim() || !cardBack.trim()) {
      alert("Both front and back text are required.");
      return;
    }

    setIsSubmitting(true);

    try {
      await useCreateCard(deckId, { cardFront, cardBack });
      setCardFront("");
      setCardBack("");
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Failed to add card. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const modifyText = (type: "bulleted" | "numbered") => {
    const currentText = activeField === "front" ? cardFront : cardBack;
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
      setCardFront(formattedText);
    } else {
      setCardBack(formattedText);
    }
  };

  const clearText = () => {
    if (activeField === "front") {
      setCardFront("");
    } else {
      setCardBack("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-[95%] max-w-[600px] rounded-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <p className="text-3xl font-secondaryRegular">Add New Card</p>
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
            placeholder="Front of the card"
            value={cardFront}
            onChange={(e) => setCardFront(e.target.value)}
            onFocus={() => setActiveField("front")}
            disabled={isSubmitting}
          />
          <textarea
            className="p-3 border-b-2 border-[#03c04a] text-black text-xl resize-none"
            placeholder="Back of the card"
            value={cardBack}
            onChange={(e) => setCardBack(e.target.value)}
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
            onClick={handleAddCard}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              "Add Card"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
