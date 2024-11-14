import jwt, { JwtPayload, VerifyErrors, VerifyCallback } from "jsonwebtoken";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";

dotenv.config();

interface CustomJwtPayload extends JwtPayload {
  user: string; // Assuming `user` is a string, adjust accordingly
}

const authorization = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const jwtToken = request.header("token");

    if (!jwtToken) {
      console.log("no token");
      response.status(401).json({ error: "Not Authorized" });
      return;
    }

    const payload = jwt.verify(
      jwtToken,
      process.env.DATABASE_URL!,
    ) as JwtPayload;
    request.user = payload.user;

    next();
  } catch (error) {
    response.status(403).json({ error: "Not Authorized" });
  }
};

export default authorization;
