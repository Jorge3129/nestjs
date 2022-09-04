import { HttpStatus } from "../constants/http-status";

export class HttpException extends Error {
  public statusCode: HttpStatus;
  public message: string;

  constructor(
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    message?: string
  ) {
    super(message ?? `${statusCode}`);
    this.statusCode = statusCode;
  }
}

export const isHttpException = (error: Error): error is HttpException => {
  return "statusCode" in error;
};
