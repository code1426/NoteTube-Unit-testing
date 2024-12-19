import { renderHook, waitFor } from "@testing-library/react";
import { mockAddDeck } from "@/mocks/data";
import useCreateDeck from "../../Decks/useCreateDeck";

describe("The useCreateDeck hook", () => {
  beforeEach(() => {});

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
