import { NotesContext } from "@/context/Contexts";
import { useContext, useState } from "react";

const useDeleteNote = (noteId: string) => {
  const { notes, setNotes } = useContext(NotesContext);
  const [error, setError] = useState<string | null>(null);

  const deleteNote = async (): Promise<{
    success: boolean;
    error: string | null;
  }> => {
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/notes/${noteId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          `Request to delete note failed with status: ${response.status}`,
        );
        return {
          success: false,
          error: `Request to delete note failed with status: ${response.status}`,
        };
      }

      setNotes(notes!.filter((note) => note.id !== noteId));

      return { success: true, error: null };
    } catch (error) {
      console.error(error);
      setError("Failed to delete note");
      return { success: false, error: "Failed to delete note" };
    }
  };

  return { deleteNote, error };
};

export default useDeleteNote;
