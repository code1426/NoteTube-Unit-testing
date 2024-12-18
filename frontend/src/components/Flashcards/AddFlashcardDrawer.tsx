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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";

interface AddFlashcardDrawerProps {
  deckId: string;
  onClose: () => void;
  onSuccess: () => void;
}

interface FlashcardContentProps {
  front: string;
  back: string;
}

const AddFlashcardDrawer = ({
  deckId,
  onClose,
  onSuccess,
}: AddFlashcardDrawerProps) => {
  const { createFlashcard, loading } = useCreateFlashcard();
  const [flashcardContent, setFlashcardContent] =
    useState<FlashcardContentProps>({
      front: "",
      back: "",
    });
  const [activeField, setActiveField] = useState<"front" | "back">("front");

  const handleChange = (field: "front" | "back", value: string) => {
    setFlashcardContent((prev) => ({ ...prev, [field]: value }));
  };

  const clearContent = (field: "front" | "back") => {
    handleChange(field, "");
  };

  const modifyText = (type: "bulleted" | "numbered") => {
    const lines = flashcardContent[activeField].split("\n");
    const formattedText = lines
      .map((line, index) => {
        const cleanedLine = line.replace(/^(•|\d+\.)\s*/, "").trim();
        if (!cleanedLine) return "";
        return type === "bulleted"
          ? `• ${cleanedLine}`
          : `${index + 1}. ${cleanedLine}`;
      })
      .join("\n");
    handleChange(activeField, formattedText);
  };

  const handleCreateFlashcard = async () => {
    const { front, back } = flashcardContent;
    if (!front.trim() || !back.trim()) {
      toast.error("Both front and back text are required.");
      return;
    }

    const result = await createFlashcard({
      id: "",
      front,
      back,
      deckId,
    });

    if (result.error) {
      toast.error("Failed to create flashcard. Please try again.");
    } else {
      toast.success("Flashcard created successfully.");
      setFlashcardContent({ front: "", back: "" });
      onSuccess();
      onClose();
    }
  };

  return (
    <DrawerContent
      onOpenAutoFocus={() => setFlashcardContent({ front: "", back: "" })}
      className="bg-white px-6 pb-10 sm:px-10 md:px-16 lg:px-24 xl:px-32"
    >
      <DrawerHeader className="relative">
        <DrawerTitle className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
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

      <div className="px-2 sm:px-2 py-2 space-y-2">
        {(["front", "back"] as Array<"front" | "back">).map((field) => (
          <>
            <Label>{field === "front" ? "Question" : "Answer"}</Label>
            <div key={field} className="relative">
              <Textarea
                className="p-3 pr-10 md:text-lg lg:text-xl resize-none"
                placeholder={`${
                  field === "front"
                    ? "Enter the question for the flashcard (e.g., What is the capital of France?)"
                    : "Enter the answer for the flashcard (e.g., Paris)"
                }`}
                value={flashcardContent[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                onFocus={() => setActiveField(field)}
                disabled={loading}
              />
              {flashcardContent[field] && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => clearContent(field)}
                >
                  <PiTrash size={24} />
                </button>
              )}
            </div>
          </>
        ))}

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

      <DrawerFooter className="space-y-4">
        <div className="flex gap-4">
          <Button
            className="flex-1 px-4 py-2 md:px-6 md:py-3 border-2 bg-white border-green text-green rounded-lg text-base md:text-xl font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            className={`flex-1 px-4 py-2 md:px-6 md:py-3 flex items-center justify-center ${
              loading ? "bg-gray-300" : "bg-green hover:bg-green/90"
            } text-white rounded-lg text-base md:text-xl font-semibold transition-colors disabled:opacity-50 gap-2`}
            onClick={handleCreateFlashcard}
            disabled={
              loading ||
              !flashcardContent.front.trim() ||
              !flashcardContent.back.trim()
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
          </Button>
        </div>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default AddFlashcardDrawer;
