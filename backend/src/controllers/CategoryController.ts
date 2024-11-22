import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppDataSource } from '@/config/data-source';
import { Category } from '@/entities/Category';
import { AuthRequest } from '@/middlewares/authJWTMiddleware';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { CategoryService } from '@/services/CategoryService';
import { handleError } from '@/utils/errorHandler';

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    const categoryRepository = new CategoryRepository(
      AppDataSource.getRepository(Category),
    );
    this.categoryService = new CategoryService(categoryRepository);
  }

  getAllCategories = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(StatusCodes.OK).json(categories);
    } catch (error: unknown) {
      handleError(res, error);
    }
  };
}
