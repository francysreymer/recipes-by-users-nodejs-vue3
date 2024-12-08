import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { handleHttpError } from '@/common/handleHttpError';
import TYPES from '@/config/types';
import ICategoryService from '@/contracts/ICategoryService';
import { AuthRequest } from '@/middlewares/authJWTMiddleware';

@injectable()
export class CategoryController {
  private categoryService: ICategoryService;

  constructor(
    @inject(TYPES.ICategoryService) categoryService: ICategoryService,
  ) {
    this.categoryService = categoryService;
  }

  findAll = async (
    req: AuthRequest,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): Promise<void> => {
    try {
      const categories = await this.categoryService.findAll();
      res.status(StatusCodes.OK).json(categories);
    } catch (error: unknown) {
      handleHttpError(res, error);
    }
  };
}
