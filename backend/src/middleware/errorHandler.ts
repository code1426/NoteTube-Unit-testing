import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  res.status(500).json({ message: err });
};

export default errorHandler;
