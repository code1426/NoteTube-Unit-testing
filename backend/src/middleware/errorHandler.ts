import { Request, Response, NextFunction } from "express";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  res.status(500).json({ message: err });
};

export default errorHandler;
