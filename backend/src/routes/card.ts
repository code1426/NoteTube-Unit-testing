import { Router } from "express";
import { pool } from "..";

const router = Router();

// GET all cards for a specific deck
router.get("/decks/:deckId/cards", async (req, res) => {
  const { deckId } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM Cards WHERE deck_id = $1 ORDER BY created_at DESC",
      [deckId],
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve cards" });
  }
});

export default router;
