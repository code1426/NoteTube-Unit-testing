import request from "supertest";

import { app, pool } from "../..";

import { testUser, testDeck } from "../../utils/testData";

const route = "/decks";

describe("The deck endpoint", () => {
  beforeEach(async () => {
    await pool.query("BEGIN");

    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [testUser.username, testUser.email, testUser.password],
    );
  }, 10000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 10000);

  afterAll(async () => {
    await pool.end();
  }, 10000);

  it("should create a new deck successfully", async () => {
    const deckData = {
      deckName: testDeck.deckName,
      color: testDeck.color,
    };
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    const response = await request(app)
      .post(route + `/${userId.rows[0].id}`)
      .send(deckData);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect({
      deckName: response.body.deck_name,
      color: response.body.color,
    }).toEqual({ deckName: testDeck.deckName, color: testDeck.color });
  }, 10000);

  it("should fetch all user decks", async () => {
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deckName, userId.rows[0].id, testDeck.color],
    );

    const response = await request(app).get(
      route + `?userId=${userId.rows[0].id}`,
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body[0]).toMatchObject({
      deck_name: testDeck.deckName,
      color: testDeck.color,
    });
  }, 10000);

  it("should rename the deck", async () => {
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deckName, userId.rows[0].id, testDeck.color],
    );
    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deckName],
    );
    const newDeckName = {
      deckName: "renamedTestDeck",
    };
    const response = await request(app)
      .put(route + `/${deckId.rows[0].id}/name`)
      .send(newDeckName);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect({ deckName: response.body.deck_name }).toEqual({
      deckName: newDeckName.deckName,
    });
  }, 10000);

  it("should change the color of the deck", async () => {
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deckName, userId.rows[0].id, testDeck.color],
    );
    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deckName],
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
  }, 10000);

  it("should delete the deck", async () => {
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    await pool.query(
      "INSERT INTO Decks (deck_name, user_id, color, created_at) VALUES ($1, $2, $3, NOW())",
      [testDeck.deckName, userId.rows[0].id, testDeck.color],
    );

    const deckId = await pool.query(
      "SELECT id FROM Decks WHERE deck_name = $1",
      [testDeck.deckName],
    );
    const response = await request(app).delete(route + `/${deckId.rows[0].id}`);

    const remainingDeck = await pool.query(
      "SELECT * FROM Decks WHERE id = $1",
      [deckId.rows[0].id],
    );

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(remainingDeck.rows.length).toBe(0);
  }, 10000);
});
