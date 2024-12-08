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

// GET all video for a specific note
// router.get(
//   "/notes/:noteId/videos",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const { noteId } = request.params;

//     // console.log("note id received", noteId)
//     try {
//       const result = await pool.query(
//         "SELECT * FROM Videos v WHERE v.note_id = $1",
//         [noteId],
//       );
//       response.status(200).json(result.rows);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

export default router;
