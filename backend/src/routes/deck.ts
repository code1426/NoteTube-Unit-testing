import { Router } from "express";
import { pool } from "..";

const router = Router();
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        d.id, 
        d.deck_name, 
        COUNT(c.id) AS card_count
      FROM Decks d
      LEFT JOIN Cards c ON c.deck_id = d.id
      GROUP BY d.id
      ORDER BY d.created_at DESC
    `);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve decks" });
  }
});

export default router;
