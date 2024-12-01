import express, { Request, Response } from "express";
import { pool } from "..";
import { Video } from "../types/video.types";

const router = express.Router();

router.post("/:userId", async (request: Request, response: Response) => {
  try {
    const { videoId, thumbnailUrl, noteId } = request.body as Video;
    const { userId } = request.params as Partial<Video>;

    if (!videoId || !thumbnailUrl || !noteId || !userId) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const result = await pool.query(
      `
      INSERT INTO Videos (video_id, thumbnail_url, note_id, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [videoId, thumbnailUrl, noteId, userId],
    );

    response.status(200).json(result.rows[0]);
  } catch (error) {
    console.log(error);
    response.status(500).json({ message: "Internal server error" });
  }
});

export default router;
