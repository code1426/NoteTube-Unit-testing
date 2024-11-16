import express, { Request, Response } from "express";
import { pool } from "..";

const router = express.Router();

router.get("/", async (request: Request, response: Response) => {
  try {
    const { userId } = request.query;
    const result = await pool.query(
      `SELECT d.id, d.deck_name, COUNT(c.id) AS card_count
         FROM Decks d
         LEFT JOIN Cards c ON c.deck_id = d.id
         WHERE d.user_id = $1
         GROUP BY d.id
         ORDER BY d.created_at DESC`,
      [userId],
    );
    response.status(200).json(result.rows);
  } catch (error) {
    response.status(500).json({ message: error });
  }
});

export default router;
