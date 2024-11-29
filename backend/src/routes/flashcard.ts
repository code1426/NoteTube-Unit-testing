import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";
import errorHandler from "../middleware/errorHandler";
import validateFlashcardInfo from "../middleware/validateFlashcardInfo";

const router = express.Router();

//CREATE FUNCTIONALITY
// Create a card
router.post(
  "/decks/:deckId/flashcards",
  validateFlashcardInfo,
  async (request: Request, response: Response, next: NextFunction) => {
    const { deckId } = request.params;
    const { front, back } = request.body;

    try {
      const result = await pool.query(
        `
        INSERT INTO Flashcards (front, back, deck_id, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *`,
        [front, back, deckId],
      );

      response.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
);

//READ FUNCTIONALITY
// GET all cards for a specific deck
router.get(
  "/decks/:deckId/flashcards",
  async (request: Request, response: Response, next: NextFunction) => {
    const { deckId } = request.params;

    try {
      const result = await pool.query(
        "SELECT * FROM Flashcards WHERE deck_id = $1 ORDER BY created_at DESC",
        [deckId],
      );
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

//UPDATE FUNCTIONALITY
// update a specific card
router.put(
  "/flashcards/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;
    const { front, back } = request.body;

    try {
      const result = await pool.query(
        `
        UPDATE Flashcards 
        SET front = $1, back = $2
        WHERE id = $3 
        RETURNING *`,
        [front, back, id],
      );

      response.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
);

//DELETE FUNCTIONALITY
// delte a specific card
router.delete(
  "/flashcards/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;

    try {
      const result = await pool.query(
        `
        DELETE FROM Flashcards 
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

router.use(errorHandler);

export default router;
