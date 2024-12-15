import { Request, Response, NextFunction } from "express";

const validateDeckInfo = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { deck_name } = request.body;

  if (!deck_name || !request.params.userId) {
    response.status(400).json({ message: "Missing deck name or user ID" });
    return;
  }

  next();
};

export default validateDeckInfo;
