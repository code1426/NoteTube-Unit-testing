import request from "supertest";
import { app, pool } from "../..";
import { testNote, testVideo } from "../../utils/testData";

describe("The video POST endpoint", () => {
  beforeEach(async () => {
    await pool.query("BEGIN");

    // Insert a test note with title and content
    await pool.query(
      "INSERT INTO Notes (title, content, created_at) VALUES ($1, $2, NOW())",
      [testNote.title, testNote.content],
    );
  }, 30000);

  afterEach(async () => {
    await pool.query("ROLLBACK");
  }, 30000);

  afterAll(async () => {
    await pool.end();
  }, 30000);

  it("should create a new video successfully", async () => {
    const noteIdResult = await pool.query(
      "SELECT id FROM Notes WHERE content = $1",
      [testNote.content],
    );

    const noteId = noteIdResult.rows[0].id;

    const videoData = {
      videoId: testVideo.videoId,
      thumbnailUrl: testVideo.thumbnailUrl,
      title: testVideo.title,
      noteId,
    };

    const response = await request(app).post("/videos").send(videoData);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body).toMatchObject({
      video_id: videoData.videoId,
      thumbnail_url: videoData.thumbnailUrl,
      title: videoData.title,
      note_id: videoData.noteId,
    });
  }, 30000);

  it("should return a 400 error when required fields are missing", async () => {
    const incompleteVideoData = {
      videoId: testVideo.videoId,
      thumbnailUrl: testVideo.thumbnailUrl,
      // Missing title and noteId
    };

    const response = await request(app)
      .post("/videos")
      .send(incompleteVideoData);

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.body).toMatchObject({ message: "Missing required fields" });
  }, 30000);

  it("should return a 500 error for database issues", async () => {
    const videoDataWithInvalidNoteId = {
      videoId: testVideo.videoId,
      thumbnailUrl: testVideo.thumbnailUrl,
      title: testVideo.title,
      noteId: 99999, // Invalid noteId
    };

    const response = await request(app)
      .post("/videos")
      .send(videoDataWithInvalidNoteId);

    expect(response.status).toBe(500);
    expect(response.body).toBeDefined();
    expect(response.body.message).toBeDefined();
  }, 30000);
});
