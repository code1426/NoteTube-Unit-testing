import express, { Request, Response, NextFunction } from "express";
import { pool } from "..";
import bcrypt from "bcrypt";
import authorization from "../middleware/authorization";

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
router.put("/", authorization, async (request: Request, response: Response) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = request.body;

    const userId = request.user;
    if (!userId) {
      response.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    if (newPassword !== confirmNewPassword) {
      response.status(400).json({ message: "Passwords do not match" });
    }

    const userQuery = await pool.query(
      "SELECT password FROM Users WHERE id = $1",
      [userId],
    );

    if (userQuery.rows.length === 0) {
      response.status(404).json({ message: "User not found" });
    }

    const storedPasswordHash = userQuery.rows[0].password;

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      storedPasswordHash,
    );

    if (!isPasswordValid) {
      response.status(401).json({ message: "Current password is incorrect" });
    }

    const saltRounds = 10;
    const newPasswordHash = await bcrypt.hash(newPassword, saltRounds);

    await pool.query("UPDATE Users SET password = $1 WHERE id = $2", [
      newPasswordHash,
      userId,
    ]);

    response.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    response.status(500).json({ message: "Internal server error" });
  }
});

// delete acoount

export default router;
