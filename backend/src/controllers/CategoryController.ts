import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { handleHttpError } from '@/common/handleHttpError';
import { AppDataSource } from '@/config/data-source';
import { Category } from '@/entities/Category';
import { AuthRequest } from '@/middlewares/authJWTMiddleware';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { CategoryService } from '@/services/CategoryService';

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    const categoryRepository = new CategoryRepository(
      AppDataSource.getRepository(Category),
    );
    this.categoryService = new CategoryService(categoryRepository);
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
