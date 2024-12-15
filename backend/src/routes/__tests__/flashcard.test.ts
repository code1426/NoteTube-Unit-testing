import request from "supertest";

import { app, pool } from "../..";

import { testUser, testDeck, testFlashcard } from "../../utils/testData";

const route = "";

describe("The flashcard endpoint", () => {
  beforeEach(async () => {
    await pool.query("BEGIN");

    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [testUser.username, testUser.email, testUser.password],
    );

    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );

    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deck_name, userId.rows[0].id, testDeck.color],
    );
  }, 30000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 30000);

  afterAll(async () => {
    await pool.end();
  }, 30000);

  it("should create a new flashcard successfully", async () => {
    const flashcardData = {
      front: testFlashcard.front,
      back: testFlashcard.back,
    };
    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deck_name],
    );
    const response = await request(app)
      .post(route + `/decks/${deckId.rows[0].id}/flashcards`)
      .send(flashcardData);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect({ front: response.body.front, back: response.body.back }).toEqual({
      front: flashcardData.front,
      back: flashcardData.back,
    });
  }, 30000);

  it("should fetch all deck flashcards", async () => {
    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deck_name],
    );

    await pool.query(
      "INSERT INTO Flashcards (front, back, deck_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testFlashcard.front, testFlashcard.back, deckId.rows[0].id],
    );

    const response = await request(app).get(
      route + `/decks/${deckId.rows[0].id}/flashcards`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0]).toMatchObject({
      front: testFlashcard.front,
      back: testFlashcard.back,
    });
  }, 30000);

  it("should change the contents of the deck", async () => {
    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deck_name],
    );
    await pool.query(
      "INSERT INTO Flashcards (front, back, deck_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testFlashcard.front, testFlashcard.back, deckId.rows[0].deck_id],
    );
    const flashcardId = await pool.query(
      "SELECT id FROM Flashcards WHERE front = $1",
      [testFlashcard.front],
    );

    const newFlashcardContents = {
      front: "newFront",
      back: "newBack",
    };

    const response = await request(app)
      .put(route + `/flashcards/${flashcardId.rows[0].id}`)
      .send(newFlashcardContents);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect({ front: response.body.front, back: response.body.back }).toEqual({
      front: newFlashcardContents.front,
      back: newFlashcardContents.back,
    });
  }, 30000);

  it("should delete the flashcard", async () => {
    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deck_name],
    );
    await pool.query(
      "INSERT INTO Flashcards (front, back, deck_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testFlashcard.front, testFlashcard.back, deckId.rows[0].id],
    );

    const flashcardId = await pool.query(
      "SELECT id FROM Flashcards WHERE front = $1",
      [testFlashcard.front],
    );

    const response = await request(app).delete(
      route + `/flashcards/${flashcardId.rows[0].id}`,
    );

    const remainingFlashcard = await pool.query(
      "SELECT * FROM Flashcards WHERE id = $1",
      [flashcardId.rows[0].id],
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(remainingFlashcard.rows.length).toBe(0);
  }, 30000);
});
