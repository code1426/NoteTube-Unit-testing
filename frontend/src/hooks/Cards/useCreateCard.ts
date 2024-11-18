const useCreateCard = async (
  deckId: string,
  cardData: { cardFront: string; cardBack: string },
) => {
  try {
    const API_URL = "http://localhost:3000";
    const response = await fetch(`${API_URL}/decks/${deckId}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      throw new Error("Failed to add card.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default useCreateCard;
