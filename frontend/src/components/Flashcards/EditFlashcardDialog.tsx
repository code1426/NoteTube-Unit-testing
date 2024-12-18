import React, { useState } from "react";
import { PiPencil, PiList, PiListNumbers, PiTrash } from "react-icons/pi";
import { Spinner } from "react-activity";
import useUpdateFlashcard from "../../hooks/Flashcards/useUpdateFlashcard";
import { Flashcard } from "../../types/flashcard.types";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";

const EditFlashcardDialog: React.FC<Flashcard> = ({
  id,
  front,
  back,
  deckId,
}) => {
  const { updateFlashcard, loading, error } = useUpdateFlashcard(id);
  const [activeField, setActiveField] = useState<"front" | "back">("front");
  const [newFront, setNewFront] = useState(front);
  const [newBack, setNewBack] = useState(back);

  const resetContent = () => {
    setNewFront(front);
    setNewBack(back);
  };

  const handleEditCard = async () => {
    if (!newFront.trim() || !newBack.trim()) {
      toast.error("Card front and back cannot be empty!");
      return;
    }

    const result = await updateFlashcard({
      id,
      front: newFront,
      back: newBack,
      deckId,
    });

    if (result.success) {
      toast.success("Flashcard updated successfully.");
    } else {
      console.error("Failed to update card:", error);
      toast.error("Failed to update card. Please try again.");
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

  const clearFrontText = () => setNewFront("");
  const clearBackText = () => setNewBack("");

  return (
    <Dialog onOpenChange={resetContent}>
      <Tooltip>
        <TooltipTrigger>
          <DialogTrigger className="select-none">
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200">
              <PiPencil size={16} />
            </button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Edit Card Contents</p>
        </TooltipContent>
      </Tooltip>

      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader className="select-none">
          <DialogTitle>Edit Card</DialogTitle>
          <DialogDescription>
            Update the contents of your card here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="select-none text-base mb-1 block">Question</Label>
            <div className="relative">
              <Textarea
                className="w-full p-3 pr-12 border text-black md:text-lg lg:text-xl resize-none"
                placeholder="Card Front"
                value={newFront}
                onChange={(e) => setNewFront(e.target.value)}
                onFocus={() => setActiveField("front")}
                disabled={loading}
              />
              {newFront && (
                <button
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={clearFrontText}
                >
                  <PiTrash size={24} />
                </button>
              )}
            </div>
          </div>

          <div>
            <Label className="select-none text-base mb-1 block">Answer</Label>
            <div className="relative">
              <Textarea
                className="w-full p-3 pr-12 border text-black md:text-lg lg:text-xl resize-none"
                placeholder="Card Back"
                value={newBack}
                onChange={(e) => setNewBack(e.target.value)}
                onFocus={() => setActiveField("back")}
                disabled={loading}
              />
              {newBack && (
                <button
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={clearBackText}
                >
                  <PiTrash size={24} />
                </button>
              )}
            </div>
          </div>

          <div className="flex justify-between">
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

        <DialogFooter className="select-none">
          <button
            className={`flex-1 px-6 py-3 h-14 flex items-center justify-center 
                ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} 
                text-white rounded-lg text-xl font-semibold 
                transition-colors disabled:opacity-50 gap-2`}
            onClick={handleEditCard}
            disabled={loading || !newFront.trim() || !newBack.trim()}
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              "Save Changes"
            )}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFlashcardDialog;
