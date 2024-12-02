import express, { Request, Response } from "express";
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

export default router;
