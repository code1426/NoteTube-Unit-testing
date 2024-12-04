import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuPortal,
} from "@/components/ui/dropdown-menu";
import { PiDotsThreeCircle } from "react-icons/pi";
import useDeleteDeck from "../../hooks/Decks/useDeleteDeck";
import EditDeckDialog from "./EditDeckDialog";
import DeleteDeckConfirmation from "./DeleteDeckConfirmation";

interface ManageDeckDropdownProps {
  id: string;
  deckName: string;
  userId: string;
}

const ManageDeckDropdown = ({
  id,
  deckName,
  userId,
}: ManageDeckDropdownProps) => {
  const { deleteDeck, error } = useDeleteDeck(id);

  const handleConfirmDelete = async () => {
    const result = await deleteDeck();
    if (result.success) {
      toast.success("Deck deleted successfully.");
      window.location.reload();
    } else {
      console.error("Error deleting deck:", error);
      toast.error("Error deleting deck.");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Manage deck options"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
        >
          <PiDotsThreeCircle size={30} color="white" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-[10.5rem] py-2">
          <DropdownMenuLabel className="select-none">
            Manage Deck
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <EditDeckDialog id={id} deckName={deckName} userId={userId} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <DeleteDeckConfirmation id={id} onDelete={handleConfirmDelete} />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default ManageDeckDropdown;
