import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";

const router = express.Router();

router.post("/:userId", async (request: Request, response: Response) => {
  const { userId } = request.params;
  const { title, content } = request.body;

  try {
    const result = await pool.query(
      `
        INSERT INTO Notes (title, content, user_id, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
        `,
      [title, content, userId],
    );

    response.status(201).json(result.rows[0]);
  } catch (error) {
    response.status(500).json({ message: error });
  }
});

// Get all user notes
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request.query;
    try {
      const result = await pool.query(
        `SELECT n.id, n.title, n.content, n.user_id, n.created_at, v.title AS video_title, v.video_id, v.thumbnail_url
        FROM Notes n
        JOIN Videos v ON v.note_id = n.id
        WHERE n.user_id = $1
        ORDER BY n.created_at DESC;`,
        [userId],
      );
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

// Get specific note
router.get(
  "/:noteId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { noteId } = request.params;

      const result = await pool.query(
        `SELECT n.id, n.title, n.content, n.user_id, n.created_at, v.title AS video_title, v.video_id, v.thumbnail_url
        FROM Notes n
        JOIN Videos v ON v.note_id = n.id
        WHERE n.id = $1
        ORDER BY n.created_at DESC;`,
        [noteId],
      );
      console.log(result);
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;

    try {
      const result = await pool.query(
        `
        DELETE FROM Notes 
        WHERE id = $1
        RETURNING *`,
        [id],
      );

      response.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
);

export default router;
