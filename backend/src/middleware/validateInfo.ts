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
      response.status(401).json({ field: "", message: "Missing Credentials" });
      return;
    } else if (!isValidEmail(email)) {
      response.status(401).json({ field: "email", message: "Invalid Email" });
      return;
    } else if (password.length < 8) {
      response.status(401).json({
        field: "password",
        message: "Password must be at least 8 characters long",
      });
      return;
    }
  } else if (request.path === "/login") {
    if (![email, password].every(Boolean)) {
      response.status(401).json({ field: "", message: "Missing Credentials" });
      return;
    } else if (!isValidEmail(email)) {
      response.status(401).json({ field: "email", message: "Invalid Email" });
      return;
    }
  }

  next();
};

export default validateInfo;
