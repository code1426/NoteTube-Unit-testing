import { http, HttpResponse } from "msw"; // msw supports graphql too!
import { mockDecks } from "./data";

const handlers = [
  http.post("/decks/:userId", async ({ request, params }) => {
    const userId = params.userId;

    const info = await request.json();

    if (!userId) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(info);
  }),

  http.get("/decks", async ({ request }) => {
    const url = new URL(request.url);

    const userId = url.searchParams.get("userId");

    if (!userId) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(
      mockDecks.filter((deck) => deck.user_id === userId),
    );
  }),

  http.put("/decks/:id/name", async ({ request, params }) => {
    const deckId = params.id;
    const updatedDeck = await request.json();

    if (!deckId) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(updatedDeck);
  }),

  http.delete("/decks/:id", async ({ params }) => {
    const deckId = params.id;

    if (!deckId) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json(mockDecks.filter((deck) => deck.id !== deckId));
  }),
];

export default handlers;
