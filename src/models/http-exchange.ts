import { NextFunction, Request, Response } from "express";

export interface HttpExchange {
  req: Request;
  res: Response;
  next: NextFunction;
}
