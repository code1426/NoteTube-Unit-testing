import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";
import errorHandler from "../middleware/errorHandler";

const router = express.Router();

router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
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
      next(error);
    }
  },
);

// router.get(
//   "/decks/:deckId",
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
