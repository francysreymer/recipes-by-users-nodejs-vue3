import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import createError from "http-errors";

export function handleError(res: Response, error: any): void {
  if (error instanceof createError.HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "An unexpected error occurred",
      details: error.message,
    });
    return;
  }
}
