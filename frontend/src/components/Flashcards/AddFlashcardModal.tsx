import { useState } from "react";
import { PiList, PiListNumbers, PiTrash, PiX } from "react-icons/pi";
import useCreateFlashcard from "../../hooks/Flashcards/useCreateFlashcard";
import { Spinner } from "react-activity";

interface AddFlashcardModalProps {
  deckId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddFlashcardModal = ({
  deckId,
  onClose,
  onSuccess,
}: AddFlashcardModalProps) => {
  const { createFlashcard, loading } = useCreateFlashcard();
  const [flashcardFront, setFlashcardFront] = useState("");
  const [flashcardBack, setFlashcardBack] = useState("");

  const [activeField, setActiveField] = useState<"front" | "back">("front");

  const handleCreateFlashcard = async () => {
    const isEmpty: boolean = !flashcardFront.trim() || !flashcardBack.trim();

    if (isEmpty) {
      alert("Both front and back text are required.");
      return;
    }

    const res = await createFlashcard({
      id: "",
      front: flashcardFront,
      back: flashcardBack,
      deckId,
    });

    if (res.error) {
      alert("Failed to create flashcard. Please try again.");
      return;
    }

    if (res.success) {
      setFlashcardFront("");
      setFlashcardBack("");
      onSuccess();
      onClose();
    }
  };

  const modifyText = (type: "bulleted" | "numbered") => {
    const currentText =
      activeField === "front" ? flashcardFront : flashcardBack;
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
      setFlashcardFront(formattedText);
    } else {
      setFlashcardBack(formattedText);
    }
  };

  const clearText = () => {
    if (activeField === "front") {
      setFlashcardFront("");
    } else {
      setFlashcardBack("");
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
            value={flashcardFront}
            onChange={(e) => setFlashcardFront(e.target.value)}
            onFocus={() => setActiveField("front")}
            disabled={loading}
          />
          <textarea
            className="p-3 border-b-2 border-[#03c04a] text-black text-xl resize-none"
            placeholder="Back of the card"
            value={flashcardBack}
            onChange={(e) => setFlashcardBack(e.target.value)}
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
            onClick={handleCreateFlashcard}
            disabled={loading}
          >
            {loading ? (
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

export default AddFlashcardModal;
