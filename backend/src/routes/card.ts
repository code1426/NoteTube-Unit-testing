import express, { Request, Response } from "express";
import { pool } from "..";

const router = express.Router();

// GET all cards for a specific deck
router.get(
  "/decks/:deckId/cards",
  async (request: Request, response: Response) => {
    const { deckId } = request.params;
    try {
      const result = await pool.query(
        "SELECT * FROM Cards WHERE deck_id = $1 ORDER BY created_at DESC",
        [deckId],
      );
      response.status(200).json(result.rows);
    } catch (error) {
      response.status(500).json({ message: error });
    }
  },
);

export default router;
