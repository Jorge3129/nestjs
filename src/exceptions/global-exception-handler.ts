import { Request, Response } from "express";
import { HttpException, isHttpException } from "./http-exception";
import { HttpStatus } from "../constants/http-status";

export const globalExceptionHandler = (
  error: Error,
  req: Request,
  res: Response
) => {
  const exception = isHttpException(error)
    ? error
    : new HttpException(HttpStatus.INTERNAL_SERVER_ERROR, error.message);

  const { message, statusCode } = exception;

  res.status(exception.statusCode).json({
    message,
    statusCode,
  });
};
