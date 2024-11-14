import express, { Request, Response } from "express";
import { pool } from "..";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator";
import validateInfo from "../middleware/validateInfo";
import authorization from "../middleware/authorization";
import type { User } from "../types/user.types";

const router = express.Router();

router.post(
  "/register",
  validateInfo,
  async (request: Request, response: Response) => {
    try {
      const { username, email, password, confirmPassword } =
        request.body as User;

      // Check if user already exists
      const existingUser = await pool.query(
        "SELECT * FROM Users WHERE email = $1",
        [email],
      );
      if (existingUser.rows.length !== 0) {
        console.log("User already exists");
        response.status(401).json({ error: "User already exists" });
        return;
      }

      if (password !== confirmPassword) {
        console.log("Passwords do not match");
        response.status(401).json({ error: "Passwords do not match" });
        return;
      }

      // Hash password
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create a new user
      const user = await pool.query(
        "INSERT INTO Users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
        [username, email, hashedPassword],
      );

      // Generate JWT token
      const token = jwtGenerator(user.rows[0].id);
      console.log("token: ", token);
      response.status(201).json(token);
    } catch (error) {
      console.log("error: ", error);
      response.status(500).json({ error: error });
    }
  },
);

router.post(
  "/login",
  validateInfo,
  async (request: Request, response: Response) => {
    try {
      const { email, password } = request.body as Omit<User, "username">;

      const user = await pool.query("SELECT * FROM Users WHERE email = $1", [
        email,
      ]);

      if (user.rows.length === 0) {
        response.status(401).json({ error: "Password or Email is Incorrect" });
        return;
      }

      const isValidPassword = await bcrypt.compare(
        password,
        user.rows[0].password,
      );
      if (!isValidPassword) {
        response.status(401).json({ error: "Password or Email is Incorrect" });
        return;
      }

      // Generate JWT token
      const token = jwtGenerator(user.rows[0].id);
      console.log(user.rows[0].id);
      response.json(token);
    } catch (error) {
      response.status(500).json({ error: error });
    }
  },
);

router.get("/verify", authorization, (_request, response) => {
  try {
    response.status(200).json(true); // response is true because the token is valid
  } catch (error) {
    response.status(500).json({ error: "not authorized" });
  }
});

export default router;
