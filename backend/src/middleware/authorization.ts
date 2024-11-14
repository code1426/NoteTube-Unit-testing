import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import type { NextFunction, Request, Response } from "express";

dotenv.config();

const authorization = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  try {
    const jwtToken = request.header("token");

    if (!jwtToken) {
      console.log("no token");
      response.status(401).json({ field: "", message: "Unauthorized" });
      return;
    }

    const payload = jwt.verify(
      jwtToken,
      process.env.DATABASE_URL!,
    ) as JwtPayload;
    request.user = payload.user;

    next();
  } catch (error) {
    response.status(403).json({ field: "", message: "Unauthorized" });
  }
};

export default authorization;
