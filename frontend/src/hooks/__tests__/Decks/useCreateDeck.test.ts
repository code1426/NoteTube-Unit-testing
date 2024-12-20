import { renderHook, waitFor } from "@testing-library/react";
import { mockAddDeck } from "@/__mocks__/data";
import useCreateDeck from "@/hooks/Decks/useCreateDeck";

describe("The useCreateDeck hook", () => {
  // CREATE A NEW DECK WITH MOCKED API
  it("should create a new deck successfully", async () => {
    const { result } = await waitFor(() => renderHook(() => useCreateDeck()));
    const createDeck = result.current.createDeck;

    const { deck: addedDeck, success } = await waitFor(() =>
      createDeck(mockAddDeck),
    );

    expect(success).toBe(true);
    expect(addedDeck).toEqual(mockAddDeck);
  });
});
