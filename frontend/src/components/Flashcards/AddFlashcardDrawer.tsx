import { useState } from "react";
import {
  PiTrash,
  PiPlusCircle,
  PiList,
  PiListNumbers,
  PiXCircle,
} from "react-icons/pi";
import { Spinner } from "react-activity";
import useCreateFlashcard from "../../hooks/Flashcards/useCreateFlashcard";
import toast from "react-hot-toast";
import {
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";

interface AddFlashcardDrawerProps {
  deckId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddFlashcardDrawer = ({
  deckId,
  onClose,
  onSuccess,
}: AddFlashcardDrawerProps) => {
  const { createFlashcard, loading } = useCreateFlashcard();
  const [flashcardFront, setFlashcardFront] = useState("");
  const [flashcardBack, setFlashcardBack] = useState("");
  const [activeField, setActiveField] = useState<"front" | "back">("front");

  const handleCreateFlashcard = async () => {
    const isEmpty: boolean = !flashcardFront.trim() || !flashcardBack.trim();

    if (isEmpty) {
      toast.error("Both front and back text are required.");
      return;
    }

    const result = await createFlashcard({
      id: "",
      front: flashcardFront,
      back: flashcardBack,
      deckId,
    });

    if (result.error) {
      toast.error("Failed to create flashcard. Please try again.");
      return;
    }

    if (result.success) {
      toast.success("Flashcard created successfully.");
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

  const clearFrontText = () => {
    setFlashcardFront("");
  };

  const clearBackText = () => {
    setFlashcardBack("");
  };

  return (
    <DrawerContent className="bg-white px-52 pb-16">
      <DrawerHeader className="relative">
        <DrawerTitle className="text-3xl font-bold text-gray-800 text-center">
          Add New Flashcard
        </DrawerTitle>
        <DrawerClose
          className="absolute right-4 top-1/2 -translate-y-1/2"
          onClick={onClose}
        >
          <PiXCircle
            size={32}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          />
        </DrawerClose>
      </DrawerHeader>

      <div className="px-6 py-4 space-y-4">
        <div className="flex flex-col border-2 border-[#03c04a]">
          <div className="relative">
            <textarea
              className="w-full p-3 border-b-2 border-[#03c04a] text-black text-xl resize-none"
              placeholder="Front of the card"
              value={flashcardFront}
              onChange={(e) => setFlashcardFront(e.target.value)}
              onFocus={() => setActiveField("front")}
              disabled={loading}
            />
            {flashcardFront && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-400 hover:text-red-500 transition-colors"
                onClick={clearFrontText}
              >
                <PiTrash size={24} />
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              className="w-full p-3 text-black text-xl resize-none"
              placeholder="Back of the card"
              value={flashcardBack}
              onChange={(e) => setFlashcardBack(e.target.value)}
              onFocus={() => setActiveField("back")}
              disabled={loading}
            />
            {flashcardBack && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-400 hover:text-red-500 transition-colors"
                onClick={clearBackText}
              >
                <PiTrash size={24} />
              </button>
            )}
          </div>

          <div className="editText bg-white text-gray-400 text-sm mt-2 flex justify-between">
            <div className="flex gap-2">
              <button
                className="p-2 text-black hover:bg-gray-200 rounded"
                onClick={() => modifyText("bulleted")}
              >
                <PiList size={24} />
              </button>
              <button
                className="p-2 text-black hover:bg-gray-200 rounded"
                onClick={() => modifyText("numbered")}
              >
                <PiListNumbers size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <DrawerFooter className="space-y-4">
        <div className="flex gap-4">
          <button
            className="flex-1 px-6 py-3 border-2 border-green text-green 
              rounded-lg text-xl font-semibold hover:bg-green/10 
              transition-colors disabled:opacity-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className={`flex-1 px-6 py-3 flex items-center justify-center 
              ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} 
              text-white rounded-lg text-xl font-semibold 
              transition-colors disabled:opacity-50 gap-2`}
            onClick={handleCreateFlashcard}
            disabled={
              loading || !flashcardFront.trim() || !flashcardBack.trim()
            }
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              <>
                <PiPlusCircle size={24} />
                Add Flashcard
              </>
            )}
          </button>
        </div>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default AddFlashcardDrawer;
