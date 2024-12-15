import { useState } from "react";
import { PiTrash, PiPencil } from "react-icons/pi";
import { Spinner } from "react-activity";
import useRenameDeck from "@/hooks/Decks/useRenameDeck";
import { Deck } from "../../types/deck.types";
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

const RenameDeckDialog: React.FC<Deck> = ({ id, deckName }) => {
  const { renameDeck, loading, error } = useRenameDeck();
  const [newDeckName, setNewDeckName] = useState(deckName!);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const resetDeckName = () => {
    setNewDeckName(deckName!);
  };

  const handleRenameDeck = async () => {
    if (!newDeckName.trim()) {
      toast.error("Deck name cannot be empty!");
      return;
    }

    const res = await renameDeck({
      id: id,
      deck_name: newDeckName,
    });

    if (res.success) {
      toast.success("Renamed deck successfully.");
      // window.location.reload();
    } else {
      console.error("Failed to rename deck:", error);
      toast.error("Failed to rename deck. Please try again.");
    }
  };

  const clearText = () => setNewDeckName("");

  return (
    <Dialog onOpenChange={resetDeckName}>
      <DialogTrigger>
        <div className="flex items-center justify-left p-2 w-40 hover:bg-gray-200 rounded-sm">
          <PiPencil size={20} className="mr-2" />
          <span className="text-sm">Rename Deck</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle>Rename Deck</DialogTitle>
          <DialogDescription>
            Rename your deck here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 mb-4 space-y-1">
          <label
            htmlFor="deckName"
            className="block text-lg font-semibold mb-2 text-left"
          >
            Deck Name
          </label>
          <div className="relative">
            <input
              id="deckName"
              className={`w-full p-3 pr-12 border-2 rounded-lg outline-none text-black font-semibold 
                ${
                  isInputFocused
                    ? "border-green ring-2 ring-green/50"
                    : "border-gray-300 hover:border-green/50"
                } 
                transition-all duration-300 ease-in-out`}
              placeholder="New Deck Name"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              onBlur={() => setIsInputFocused(false)}
              onFocus={() => setIsInputFocused(true)}
              disabled={loading}
              maxLength={50}
            />
            {newDeckName && (
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
            {newDeckName.length} / 50 characters
          </div>
        </div>

        <DialogFooter>
          <button
            className={`flex-1 px-6 h-14 flex items-center justify-center 
                ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} 
                text-white rounded-lg text-xl font-semibold 
                transition-colors disabled:opacity-50 gap-2`}
            onClick={handleRenameDeck}
            disabled={loading || !newDeckName.trim()}
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

export default RenameDeckDialog;
