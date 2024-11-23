import { useState } from "react";
import { Flashcard } from "../../types/flashcard.types";

const API_URL = "http://localhost:3000";

interface UpdateFlashcardResult {
  success: boolean;
  flashcard?: Flashcard;
  error?: string | null;
}

const useUpdateFlashcard = (flashcardId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateFlashcard = async (
    flashcardData: Flashcard,
  ): Promise<UpdateFlashcardResult> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/cards/${flashcardId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(flashcardData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error response:", errorData);
        throw new Error("Failed to update card.");
      }

      const flashcard: Flashcard = await response.json();
      return { success: true, flashcard: flashcard };
    } catch (error) {
      console.error("Update error:", error);
      return { success: false, error: "Failed to update card" };
    }
  };
  return { updateFlashcard, loading, error };
};

export default useUpdateFlashcard;
