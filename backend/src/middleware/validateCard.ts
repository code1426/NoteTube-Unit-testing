import { Request, Response, NextFunction } from "express";

const validateCard = (
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

export default validateCard;
