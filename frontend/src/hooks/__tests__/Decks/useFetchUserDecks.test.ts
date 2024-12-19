import { renderHook, waitFor } from "@testing-library/react";
import useFetchUserDecks from "../../Decks/useFetchUserDecks"; // Adjust the import based on your file structure
import { mockDecks } from "@/mocks/data";

describe("The useFetchUserDecks hook", () => {
  // FETCH USER DECKS WITH MOCKED API
  it("should fetch all user decks", async () => {
    const mockUserId = "1";

    const { result } = await waitFor(() =>
      renderHook(() => useFetchUserDecks(mockUserId)),
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.userDecks).toEqual(
      mockDecks.filter((deck) => deck.user_id === "1"),
    );
  });

  it("should return an error if the userid is empty", async () => {
    const mockUserId = " ";

    const { result } = await waitFor(() =>
      renderHook(() => useFetchUserDecks(mockUserId)),
    );

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe("No user ID provided");
  });
});
