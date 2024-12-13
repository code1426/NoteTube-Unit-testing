import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";
import { Video } from "../types/video.types";

const router = express.Router();

router.post("/", async (request: Request, response: Response) => {
  try {
    const { videoId, thumbnailUrl, title, noteId } = request.body as Video;

    if (!videoId || !thumbnailUrl || !noteId) {
      response.status(400).json({ message: "Missing required fields" });
      return;
    }

    const result = await pool.query(
      `
      INSERT INTO Videos (video_id, thumbnail_url, title, note_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [videoId, thumbnailUrl, title, noteId],
    );

    response.status(200).json(result.rows[0]);
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

export default router;
