import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";
import errorHandler from "../middleware/errorHandler";
import validateDeckInfo from "../middleware/validateDeckInfo";

const router = express.Router();

//CREATE FUNCTIONALITY
// Add a new deck
router.post(
  "/:userId",
  validateDeckInfo,
  async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request.params;
    const { deckName } = request.body;
    try {
      const result = await pool.query(
        `
        INSERT INTO Decks (deck_name, user_id, created_at)
        VALUES ($1, $2, NOW())
        RETURNING *
        `,
        [deckName, userId],
      );
      response.status(201).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
);

//READ FUNCTIONALITY
// Get all user decks
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { userId } = request.query;
      const result = await pool.query(
        `SELECT d.id, d.deck_name, COUNT(c.id) AS card_count
         FROM Decks d
         LEFT JOIN Flashcards c ON c.deck_id = d.id
         WHERE d.user_id = $1
         GROUP BY d.id
         ORDER BY d.created_at DESC`,
        [userId],
      );
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

// router.get(
//   "/:deckId",
//   async (request: Request, response: Response, next: NextFunction) => {
//     try {
//       const { deckId } = request.params;

//       const result = await pool.query(
//         `SELECT d.id, d.deck_name, d.created_at, COUNT(c.id) AS card_count
//          FROM Decks d
//          LEFT JOIN Cards c ON c.deck_id = d.id
//          WHERE d.id = $1
//          GROUP BY d.id`,
//         [deckId],
//       );
//       response.status(200).json(result.rows);
//     } catch (error) {
//       next(error);
//     }
//   },
// );

router.use(errorHandler);

export default router;
