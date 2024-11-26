import { Request, Response, NextFunction } from "express";

const validateDeckInfo = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { deckName } = request.body;

  if (!deckName || !request.params.userId) {
    response.status(400).json({ message: "Missing deck name or user ID" });
    return;
  }

  next();
};

export default validateDeckInfo;
