import { renderHook, waitFor } from "@testing-library/react";
import useRenameDeck from "@/hooks/Decks/useRenameDeck";
import { mockAddDeck } from "@/__mocks__/data";

describe("The useRenameDeck hook", () => {
  // RENAME DECK WITH MOCKED API
  it("should rename a specified deck successfully", async () => {
    const mockRenamedDeck = { ...mockAddDeck, deck_name: "shishshish" };

    const { result } = await waitFor(() => renderHook(() => useRenameDeck()));
    const renameDeck = result.current.renameDeck;

    const { success, deck: updatedDeck } = await waitFor(() =>
      renameDeck(mockRenamedDeck),
    );

    expect(success).toBe(true);
    expect(updatedDeck).toEqual(mockRenamedDeck);
  });
});
