import type { Request, Response, NextFunction } from "express";
import { User } from "../types/user.types";

const validateInfo = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { email, username, password } = request.body as User;

  function isValidEmail(userEmail: string): boolean {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(userEmail);
  }

  if (request.path === "/register") {
    if (![email, username, password].every(Boolean)) {
      console.log("Missing credentials");
      response.status(401).json({ error: "Missing Credentials" });
      return;
    } else if (!isValidEmail(email)) {
      console.log("Invalid email");
      response.status(401).json({ error: "Invalid Email" });
      return;
    }

  } else if (request.path === "/login") {
    if (![email, password].every(Boolean)) {
      response.status(401).json({ error: "Missing Credentials" });
      return;
    } else if (!isValidEmail(email)) {
      response.status(401).json({ error: "Invalid Email" });
      return;
    }
  }

  next();
};

export default validateInfo;
