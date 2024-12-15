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
    const { deck_name, color } = request.body;

    try {
      const result = await pool.query(
        `
        INSERT INTO Decks (deck_name, user_id, color, created_at)
        VALUES ($1, $2, $3, NOW())
        RETURNING *
        `,
        [deck_name, userId, color],
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
        `SELECT d.*, COUNT(c.id) AS card_count
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

//UPDATE FUNCTIONALITY
//get info  a specific deck
router.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;

      const result = await pool.query(
        `
        SELECT * FROM Decks
        WHERE id = $1
         `,
        [id],
      );
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

//UPDATE FUNCTIONALITY
//update a specific deck

//rename deck
router.put(
  "/:id/name",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const { deck_name } = request.body;

      const result = await pool.query(
        `
        UPDATE Decks
        SET deck_name = $1
        WHERE id = $2
        RETURNING *
         `,
        [deck_name, id],
      );
      response.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
);

//change deck color
router.put(
  "/:id/color",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.params;
      const { color } = request.body;

      const result = await pool.query(
        `
        UPDATE Decks
        SET color = $1
        WHERE id = $2
        RETURNING *
         `,
        [color, id],
      );
      response.status(200).json(result.rows[0]);
    } catch (error) {
      next(error);
    }
  },
);

//DELETE FUNCTIONALITY
//delete a specific deck
router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    const { id } = request.params;

    try {
      const result = await pool.query(
        `
        DELETE FROM Decks 
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
