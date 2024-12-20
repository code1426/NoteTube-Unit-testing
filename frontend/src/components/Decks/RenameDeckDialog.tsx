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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const RenameDeckDialog: React.FC<Deck> = ({ id, deckName }) => {
  const { renameDeck, loading } = useRenameDeck();
  const [newDeckName, setNewDeckName] = useState(deckName!);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleRenameDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

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
      setDialogOpen(false);
    } else {
      toast.error("Failed to rename deck. Please try again.");
    }
  };

  const clearText = () => setNewDeckName("");

  const handleDialogOpenChange = (open: boolean): void => {
    setDialogOpen(open);
    if (open) {
      setNewDeckName(deckName!);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger className="select-none">
        <div className="flex items-center justify-left p-2 w-40 hover:bg-gray-200 hover:dark:bg-dark-foreground rounded-sm">
          <PiPencil size={20} className="mr-2" />
          <span className="text-sm">Rename Deck</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-dark-background p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="select-none">Rename Deck</DialogTitle>
          <DialogDescription className="select-none">
            Rename your deck here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleRenameDeck}>
          <div className="py-4 mb-4 space-y-1">
            <Label className="select-none">Deck Name</Label>
            <div className="relative">
              <Input
                id="deckName"
                className="px-2.5 py-1.5 pr-11 rounded-lg border bg-white dark:bg-dark-foreground dark:text-white focus:outline-none focus:ring-1 focus:ring-green focus:ring-offset-2 hover:outline-none hover:ring-green hover:ring-1 hover:ring-offset-2 transition-all"
                placeholder="New Deck Name"
                value={newDeckName}
                onChange={(e) => setNewDeckName(e.target.value)}
                disabled={loading}
                maxLength={50}
              />
              {newDeckName && (
                <button
                  onClick={clearText}
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-red-500 transition-colors"
                >
                  <PiTrash size={24} />
                </button>
              )}
            </div>
            <div className="text-sm text-gray-500 text-right select-none">
              {newDeckName.length} / 50 characters
            </div>
          </div>

          <DialogFooter>
            <Button
              className={`flex-1 px-6 h-12 flex items-center justify-center 
                ${loading ? "bg-gray-300" : "bg-green hover:bg-green/90"} 
                text-white rounded-lg text-xl font-semibold 
                transition-colors disabled:opacity-50 gap-2 select-none`}
              onClick={handleRenameDeck}
              disabled={loading || !newDeckName.trim()}
              type="submit"
            >
              {loading ? (
                <Spinner size={12} color="#fff" animating={true} />
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenameDeckDialog;
