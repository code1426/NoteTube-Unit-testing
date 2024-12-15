import request from "supertest";

import { app, pool } from "../..";

import { testUser, testDeck } from "../../utils/testData";

const route = "/decks";

let userId: string;

describe("The deck endpoint", () => {
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

    userId = userIdResult.rows[0].id;
  }, 30000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 30000);

  afterAll(async () => {
    await pool.end();
  }, 30000);

  it("should create a new deck successfully", async () => {
    const response = await request(app)
      .post(route + `/${userId}`)
      .send(testDeck);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect({
      deck_name: response.body.deck_name,
      color: response.body.color,
    }).toEqual(testDeck);
  }, 30000);

  it("should fetch all user decks", async () => {
    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deck_name, userId, testDeck.color],
    );

    const response = await request(app).get(route + `?userId=${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect({
      deck_name: response.body[0].deck_name,
      color: response.body[0].color,
    }).toEqual(testDeck);
  }, 30000);

  it("should rename the deck", async () => {
    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deck_name, userId, testDeck.color],
    );

    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deck_name],
    );

    const newDeckName = {
      deck_name: "renamedTestDeck",
    };

    const response = await request(app)
      .put(route + `/${deckId.rows[0].id}/name`)
      .send(newDeckName);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect({ deck_name: response.body.deck_name }).toEqual({
      deck_name: newDeckName.deck_name,
    });
  }, 30000);

  it("should change the color of the deck", async () => {
    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deck_name, userId, testDeck.color],
    );
    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deck_name],
    );
    const newColor = {
      color: "blue",
    };
    const response = await request(app)
      .put(route + `/${deckId.rows[0].id}/color`)
      .send(newColor);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect({ color: response.body.color }).toEqual({
      color: newColor.color,
    });
  }, 30000);

  it("should delete the deck", async () => {
    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deck_name, userId, testDeck.color],
    );

    const deckIdResult = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deck_name],
    );

    const deckId = deckIdResult.rows[0].id;

    const response = await request(app).delete(route + `/${deckId}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testDeck);
  }, 30000);
});
