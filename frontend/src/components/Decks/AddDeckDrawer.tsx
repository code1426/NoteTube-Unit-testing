import { useState } from "react";
import { PiTrash, PiPlusCircle, PiXCircle } from "react-icons/pi";
import { Spinner } from "react-activity";
import useCreateDeck from "../../hooks/Decks/useCreateDeck";
import toast from "react-hot-toast";
import {
  DrawerContent,
  DrawerClose,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import pastelColors from "./deckColors";

interface AddDeckDrawerProps {
  userId: string;
  onClose: () => void;
  onSuccess: () => void;
}

const AddDeckDrawer = ({ userId, onClose, onSuccess }: AddDeckDrawerProps) => {
  const { createDeck, loading } = useCreateDeck();
  const [deckName, setDeckName] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleCreateDeck = async () => {
    if (!deckName.trim()) {
      toast.error("Deck Name is required.");
      return;
    }

    const selectedColor =
      pastelColors[Math.floor(Math.random() * pastelColors.length)];

    const result = await createDeck({
      id: "",
      deckName: deckName.trim(),
      userId: userId,
      color: selectedColor,
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
    <DrawerContent className="bg-white px-52 pb-16">
      <DrawerHeader className="relative">
        <DrawerTitle className="text-3xl font-bold text-gray-800 text-center">
          Create New Deck
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
        <div className="relative">
          <input
            className={`w-full p-3 pr-12 border-2 rounded-lg text-black text-xl 
              ${
                isInputFocused
                  ? "border-green ring-2 ring-green/50"
                  : "border-gray-300 hover:border-green/50"
              } 
              transition-all duration-300 ease-in-out`}
            placeholder="Enter deck name"
            value={deckName}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={(e) => setDeckName(e.target.value)}
            disabled={loading}
            maxLength={50}
          />
          {deckName && (
            <button
              onClick={clearText}
              className="absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-400 hover:text-red-500 transition-colors"
              aria-label="Clear input"
            >
              <PiTrash size={24} />
            </button>
          )}
        </div>

        <div className="text-sm text-gray-500 text-right">
          {deckName.length} / 50 characters
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
            onClick={handleCreateDeck}
            disabled={loading || !deckName.trim()}
          >
            {loading ? (
              <Spinner size={12} color="#fff" animating={true} />
            ) : (
              <>
                <PiPlusCircle size={24} />
                Add Deck
              </>
            )}
          </button>
        </div>
      </DrawerFooter>
    </DrawerContent>
  );
};

export default AddDeckDrawer;
