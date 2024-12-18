import request from "supertest";

import { app, pool } from "../..";

import { testUser, testNote, testVideo } from "../../utils/testData";

const route = "/notes";

describe("The note endpoint", () => {
  beforeEach(async () => {
    await pool.query("BEGIN");

    await pool.query(
      "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3)",
      [testUser.username, testUser.email, testUser.password],
    );
  }, 50000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 50000);

  afterAll(async () => {
    await pool.end();
  }, 50000);

  it("should create a new note successfully", async () => {
    const noteData = {
      title: testNote.title,
      content: testNote.content,
    };
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    const noteResponse = await request(app)
      .post(route + `/${userId.rows[0].id}`)
      .send(noteData);

    expect(noteResponse.status).toBe(201);
    expect(noteResponse.body).toBeDefined();
    expect({
      title: noteResponse.body.title,
      content: noteResponse.body.content,
    }).toEqual({ title: noteData.title, content: noteData.content });
  }, 50000);

  it("should fetch all user notes", async () => {
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    await pool.query(
      "INSERT INTO Notes (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testNote.title, testNote.content, userId.rows[0].id],
    );
    const noteId = await pool.query("SELECT id FROM Notes WHERE user_id = $1", [
      userId.rows[0].id,
    ]);
    await pool.query(
      "INSERT INTO Videos (video_id, thumbnail_url, title, note_id) VALUES ($1, $2, $3, $4)",
      [
        testVideo.videoId,
        testVideo.thumbnailUrl,
        testVideo.title,
        noteId.rows[0].id,
      ],
    );
    const response = await request(app).get(
      route + `?userId=${userId.rows[0].id}`,
    );

    // console.log(response.body);
  }, 50000);

  it("should fetch a user note", async () => {
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    await pool.query(
      "INSERT INTO Notes (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testNote.title, testNote.content, userId.rows[0].id],
    );
    const noteId = await pool.query("SELECT id FROM Notes WHERE user_id = $1", [
      userId.rows[0].id,
    ]);
    await pool.query(
      "INSERT INTO Videos (video_id, thumbnail_url, title, note_id) VALUES ($1, $2, $3, $4)",
      [
        testVideo.videoId,
        testVideo.thumbnailUrl,
        testVideo.title,
        noteId.rows[0].id,
      ],
    );
    const response = await request(app).get(
      route + `${noteId.rows[0].note_id}`,
    );

    // console.log(response.body);
  }, 50000);

  it("should delete a user note", async () => {
    const userId = await pool.query(
      "SELECT id FROM Users WHERE username = $1",
      [testUser.username],
    );
    await pool.query(
      "INSERT INTO Notes (title, content, user_id, created_at) VALUES ($1, $2, $3, NOW())",
      [testNote.title, testNote.content, userId.rows[0].id],
    );

    const noteId = await pool.query("SELECT id FROM Notes WHERE user_id = $1", [
      userId.rows[0].id,
    ]);
    console.log(noteId.rows);
    console.log(noteId.rows[0].id);

    const response = await request(app).delete(route + `/${noteId.rows[0].id}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(testNote);
  }, 50000);
});
