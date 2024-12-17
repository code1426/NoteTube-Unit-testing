import { useState } from "react";
import { PiTrash, PiPlusCircle, PiList, PiListNumbers } from "react-icons/pi";
import { Spinner } from "react-activity";
import useCreateFlashcard from "../../hooks/Flashcards/useCreateFlashcard";
import toast from "react-hot-toast";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface AddFlashcardDialogProps {
  deckId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddFlashcardDialog = ({
  deckId,
  onClose,
  onSuccess,
}: AddFlashcardDialogProps) => {
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
    <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
      <DialogHeader>
        <DialogTitle>Create New Flashcard</DialogTitle>
        <DialogDescription>
          Create a new flashcard here. Provide the front and back contents for
          the card. Click add card when you are done.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4">
        <div className="flex flex-col border-2 border-black">
          <div className="relative">
            <Textarea
              className="p-3 md:text-lg lg:text-xl resize-none"
              placeholder="Front of the card"
              value={flashcardFront}
              onChange={(e) => setFlashcardFront(e.target.value)}
              onFocus={() => setActiveField("front")}
              disabled={loading}
            />
            {flashcardFront && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                onClick={clearFrontText}
              >
                <PiTrash size={24} />
              </button>
            )}
          </div>
          <div className="relative">
            <Textarea
              className="p-3 md:text-lg lg:text-xl resize-none"
              placeholder="Back of the card"
              value={flashcardBack}
              onChange={(e) => setFlashcardBack(e.target.value)}
              onFocus={() => setActiveField("back")}
              disabled={loading}
            />
            {flashcardBack && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                onClick={clearBackText}
              >
                <PiTrash size={24} />
              </button>
            )}

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
      </div>

      <DialogFooter className="space-y-4">
        <Button
          className={`flex-1 px-4 py-2 md:px-6 md:py-3 flex items-center justify-center ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} text-white rounded-lg text-base md:text-xl font-semibold transition-colors disabled:opacity-50 gap-2`}
          onClick={handleCreateFlashcard}
          disabled={loading || !flashcardFront.trim() || !flashcardBack.trim()}
          type="submit"
        >
          {loading ? (
            <Spinner size={12} color="#fff" animating={true} />
          ) : (
            <>
              <PiPlusCircle size={24} />
              Add Flashcard
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddFlashcardDialog;
