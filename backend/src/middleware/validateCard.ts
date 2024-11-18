import { Request, Response, NextFunction } from "express";

const validateCard = (
  request: Request,
  response: Response,
  next: NextFunction,
): void => {
  const { cardFront, cardBack } = request.body;

  if (!cardFront || !cardBack) {
    response.status(400).json({ message: "Missing info" });
    return;
  }

  next();
};

export default validateCard;
