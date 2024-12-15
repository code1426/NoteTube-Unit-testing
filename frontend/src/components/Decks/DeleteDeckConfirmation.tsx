import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { PiTrash } from "react-icons/pi";

interface DeleteDeckModalProps {
  id: string;
  onDelete: () => void;
}

const DeleteDeckConfirmation = ({ onDelete }: DeleteDeckModalProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className="flex items-center justify-left p-2 w-40 hover:bg-red-500 hover:text-white rounded-sm">
          <PiTrash size={20} className="mr-2" />{" "}
          <span className="text-sm">Delete Deck</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this deck?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the deck
            and its contents.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={onDelete}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDeckConfirmation;
