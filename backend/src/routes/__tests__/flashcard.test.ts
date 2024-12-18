import request from "supertest";

import { app, pool } from "../..";

import { testUser, testDeck, testFlashcard } from "../../utils/testData";

const route = "";

let deckId: string;

describe("The flashcard endpoint", () => {
  beforeEach(async () => {
    await pool.query("BEGIN");

    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [testUser.username, testUser.email, testUser.password],
    );

    const userIdResult = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );

    const userId = userIdResult.rows[0].id;

    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deck_name, userId, testDeck.color],
    );

    const deckIdResult = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deck_name],
    );

    deckId = deckIdResult.rows[0].id;
  }, 50000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 50000);

  afterAll(async () => {
    await pool.end();
  }, 50000);

  it("should create a new flashcard successfully", async () => {
    const response = await request(app)
      .post(route + `/decks/${deckId}/flashcards`)
      .send(testFlashcard);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body).toMatchObject(testFlashcard);
  }, 50000);

  it("should fetch all deck flashcards", async () => {
    await pool.query(
      "INSERT INTO Flashcards (front, back, deck_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testFlashcard.front, testFlashcard.back, deckId],
    );

    const response = await request(app).get(
      route + `/decks/${deckId}/flashcards`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0]).toMatchObject(testFlashcard);
  }, 50000);

  it("should change the contents of the flashcard", async () => {
    await pool.query(
      "INSERT INTO Flashcards (front, back, deck_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testFlashcard.front, testFlashcard.back, deckId],
    );
    const flashcardIdResult = await pool.query(
      "SELECT id FROM Flashcards WHERE front = $1",
      [testFlashcard.front],
    );

    const flashcardId = flashcardIdResult.rows[0].id;

    const newFlashcardContents = {
      front: "newFront",
      back: "newBack",
    };

    const response = await request(app)
      .put(route + `/flashcards/${flashcardId}`)
      .send(newFlashcardContents);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toMatchObject(newFlashcardContents);
  }, 50000);

  it("should delete the flashcard", async () => {
    await pool.query(
      "INSERT INTO Flashcards (front, back, deck_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testFlashcard.front, testFlashcard.back, deckId],
    );

    const flashcardIdResult = await pool.query(
      "SELECT id FROM Flashcards WHERE front = $1",
      [testFlashcard.front],
    );

    const flashcardId = flashcardIdResult.rows[0].id;

    const response = await request(app).delete(
      route + `/flashcards/${flashcardId}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testFlashcard);
  }, 50000);
});
