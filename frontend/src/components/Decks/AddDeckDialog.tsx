import { useState } from "react";
import { PiTrash, PiPlusCircle } from "react-icons/pi";
import { Spinner } from "react-activity";
import useCreateDeck from "../../hooks/Decks/useCreateDeck";
import toast from "react-hot-toast";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import generateRandomColor from "@/utils/generateRandomColor";

interface AddDeckDialogProps {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDeckDialog = ({ userId, onClose, onSuccess }: AddDeckDialogProps) => {
  const { createDeck, loading } = useCreateDeck();
  const [deckName, setDeckName] = useState("");
  // const [isInputFocused, setIsInputFocused] = useState(false);

  const handleCreateDeck = async () => {
    if (!deckName.trim()) {
      toast.error("Deck Name is required.");
      return;
    }

    const selectedColor = generateRandomColor();

    const result = await createDeck({
      id: "",
      deck_name: deckName.trim(),
      user_id: userId,
      color: selectedColor,
      card_count: 0,
    });

    if (result.error) {
      toast.error("Failed to create deck. Please try again.");
      return;
    }

    if (result.success) {
      toast.success("Deck added successfully.");
      setDeckName("");
      onSuccess();
      onClose();
    }
  };

  const clearText = () => {
    setDeckName("");
  };

  return (
    <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
      <DialogHeader>
        <DialogTitle>Create New Deck</DialogTitle>
        <DialogDescription>
          Create a new deck here. Click add deck when you are done.
        </DialogDescription>
      </DialogHeader>

      <div className="relative">
        <Input
          className="px-2.5 py-1.5 rounded-lg border bg-whit focus:outline-none focus:ring-1 focus:ring-green focus:ring-offset-2 hover:outline-none hover:ring-green hover:ring-1 hover:ring-offset-2 transition-all"
          placeholder="Enter deck name"
          value={deckName}
          onChange={(e) => setDeckName(e.target.value)}
          disabled={loading}
          maxLength={50}
        />
        {deckName && (
          <button
            onClick={clearText}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <PiTrash size={24} />
          </button>
        )}
      </div>

      <div className="text-sm text-gray-500 text-right">
        {deckName.length} / 50 characters
      </div>

      <DialogFooter className="space-y-4">
        <Button
          className={`flex-1 px-4 py-2 md:px-6 md:py-3 flex items-center justify-center ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} text-white rounded-lg text-base md:text-xl font-semibold transition-colors disabled:opacity-50 gap-2`}
          onClick={handleCreateDeck}
          disabled={loading || !deckName.trim()}
          type="submit"
        >
          {loading ? (
            <Spinner size={12} color="#fff" animating={true} />
          ) : (
            <>
              <PiPlusCircle size={24} />
              Add Deck
            </>
          )}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default AddDeckDialog;
