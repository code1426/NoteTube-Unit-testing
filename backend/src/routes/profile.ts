import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";

const router = express.Router();
// update name
// get
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.query;
      const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [
        id,
      ]);
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

// update
router.put(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { id } = request.query;
      const { username } = request.body;

      const result = await pool.query(
        `
        UPDATE users
        SET username = $1
        WHERE id = $2
        RETURNING *
         `,
        [username, id],
      );
      response.status(200).json(result.rows);
    } catch (error) {
      next(error);
    }
  },
);

// update email

// update password

// delete acoount

export default router;
