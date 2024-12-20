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
import React from "react";
import { PiTrash } from "react-icons/pi";

interface DeleteHistoryConfirmationProps {
  id: string;
  onDelete: (e: React.MouseEvent) => Promise<void>;
}

const DeleteHistoryConfirmation = ({
  onDelete,
}: DeleteHistoryConfirmationProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 hover:dark:bg-dark-background">
          <PiTrash size={16} />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="dark:bg-dark-background">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this note?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the note
            and its contents.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-white text-black hover:bg-gray-100 hover:dark:bg-dark-foreground">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500 hover:bg-red-400 dark:bg-red-500"
            onClick={onDelete}
          >
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteHistoryConfirmation;
