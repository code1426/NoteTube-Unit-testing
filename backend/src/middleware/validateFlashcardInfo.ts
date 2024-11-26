import { Request, Response, NextFunction } from "express";

const validateFlashcardInfo = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { front, back } = request.body;

  if (!front || !back) {
    response.status(400).json({ message: "Missing info" });
    return;
  }

  next();
};

export default validateFlashcardInfo;
