const useUpdateCard = async (
  cardId: string,
  cardData: { cardFront: string; cardBack: string },
) => {
  if (!cardData.cardFront || !cardData.cardBack) {
    throw new Error("Both card_front and card_back must have values.");
  }

  try {
    const API_URL = "http://localhost:3000";
    const response = await fetch(`${API_URL}/cards/${cardId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Server error response:", errorData);
      throw new Error("Failed to update card.");
    }

    return await response.json();
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
};

export default useUpdateCard;
