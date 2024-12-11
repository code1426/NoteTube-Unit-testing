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
import RenameDeckDialog from "./RenameDeckDialog";
import ChangeDeckColorDialog from "./ChangeDeckColorDialog";
import DeleteDeckConfirmation from "./DeleteDeckConfirmation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ManageDeckDropdownProps {
  id: string;
  deckName: string;
  userId: string;
  color: string;
}

const ManageDeckDropdown = ({
  id,
  deckName,
  color,
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
      <Tooltip>
        <TooltipTrigger>
          <DropdownMenuTrigger>
            <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200">
              <PiDotsThreeCircle size={30} color="white" />
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Manage Deck</p>
        </TooltipContent>
      </Tooltip>
      <DropdownMenuPortal>
        <DropdownMenuContent className="w-[10.5rem] py-2">
          <DropdownMenuLabel className="select-none">
            Manage Deck
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <RenameDeckDialog id={id} deckName={deckName} />
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <ChangeDeckColorDialog id={id} color={color!} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
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
