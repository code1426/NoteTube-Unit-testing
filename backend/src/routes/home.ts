import express, { Request, Response } from "express";
import { pool } from "..";
import authorization from "../middleware/authorization";

const router = express.Router();

router.get("/", authorization, async (request: Request, response: Response) => {
  try {
    const user = await pool.query(
      "SELECT id, username, email FROM Users WHERE id = $1",
      [request.user],
    );

    if (!user.rows[0]) throw new Error("User not found");

    response.status(200).json(user.rows[0]);
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : "An error occured",
    });
  }
});

export default router;
