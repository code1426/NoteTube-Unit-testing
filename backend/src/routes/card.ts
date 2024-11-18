import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";
import errorHandler from "../middleware/errorHandler";
import validateCard from "../middleware/validateCard";

const router = express.Router();

//CREATE FUNCTIONALITY
// Create a card
router.post(
  "/decks/:deckId/cards",
  validateCard,
  async (request: Request, response: Response, next: NextFunction) => {
    const { deckId } = request.params;
    const { cardFront, cardBack } = request.body;

    try {
      const result = await pool.query(
        `
        INSERT INTO Cards (deck_id, card_front, card_back, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *`,
        [deckId, cardFront, cardBack],
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
  "/decks/:deckId/cards",
  async (request: Request, response: Response, next: NextFunction) => {
    const { deckId } = request.params;

    try {
      const result = await pool.query(
        "SELECT * FROM Cards WHERE deck_id = $1 ORDER BY created_at DESC",
        [deckId],
      );
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

//GET details for a specific card
// router.get(
//   "/cards/:cardId",
//   async (request: Request, response: Response, next: NextFunction) => {
//     const { cardId } = request.params;

//     try {
//       const result = await pool.query(
//         "SELECT * FROM Cards WHERE id = $1 LIMIT 1",
//         [cardId],
//       );
//       response.status(200).json(result.rows);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

//UPDATE FUNCTIONALITY
// update a specific card
router.put(
  "/cards/:cardId",
  async (request: Request, response: Response, next: NextFunction) => {
    const { cardId } = request.params;
    const { cardFront, cardBack } = request.body;

    try {
      const result = await pool.query(
        `
        UPDATE Cards 
        SET card_front = $1, card_back = $2
        WHERE id = $3 
        RETURNING *`,
        [cardFront, cardBack, cardId],
      );

      response.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
);

router.use(errorHandler);

export default router;
