import { Response } from 'express';
import createError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export interface CustomError extends Error {
  statusCode?: number;
  details?: string;
}

export function handleError(res: Response, error: CustomError): void {
  if (error instanceof createError.HttpError) {
    res.status(error.statusCode).json({ message: error.message });
    return;
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: 'An unexpected error occurred',
      details: error.message,
    });
    return;
  }
}
