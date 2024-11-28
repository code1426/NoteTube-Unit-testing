import { useState } from "react";

const useDeleteFlashcard = (flashcardId: string) => {
  const [error, setError] = useState<string | null>(null);

  const deleteFlashcard = async (): Promise<{
    success: boolean;
    error: string | null;
  }> => {
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_API_URL}/flashcards/${flashcardId}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        setError(
          `Request to delete flashcard failed with status: ${response.status}`,
        );
        return {
          success: false,
          error: `Request to delete flashcard failed with status: ${response.status}`,
        };
      }

      return { success: true, error: null };
    } catch (error) {
      console.error(error);
      setError("Failed to delete flashcard");
      return { success: false, error: "Failed to delete flashcard" };
    }
  };

  return { deleteFlashcard, error };
};

export default useDeleteFlashcard;
