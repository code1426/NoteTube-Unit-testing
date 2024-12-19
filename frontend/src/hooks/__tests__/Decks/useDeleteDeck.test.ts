import { renderHook, waitFor } from "@testing-library/react";
import useDeleteDeck from "@/hooks/Decks/useDeleteDeck";

describe("The useDeleteDeck hook", () => {
  // DELETE DECK WITH MOCKED API
  it("should delete a specified deck successfully", async () => {
    const mockDeckId = "2";
    const { result } = await waitFor(() =>
      renderHook(() => useDeleteDeck(mockDeckId)),
    );
    const deleteDeck = result.current.deleteDeck;

    const { success } = await waitFor(() => deleteDeck());

    expect(success).toBe(true);
  });
});
