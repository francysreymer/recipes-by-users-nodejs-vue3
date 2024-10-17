import { Response, NextFunction } from "express";
import { AppDataSource } from "@/config/data-source";
import { CategoryService } from "@/services/CategoryService";
import { CategoryRepository } from "@/repositories/CategoryRepository";
import { Category } from "@/entities/Category";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "@/middlewares/authJWTMiddleware";
import { handleError } from "@/utils/errorHandler";

export class CategoryController {
  private categoryService: CategoryService;

  constructor() {
    const categoryRepository = new CategoryRepository(
      AppDataSource.getRepository(Category)
    );
    this.categoryService = new CategoryService(categoryRepository);
  }

  getAllCategories = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const categories = await this.categoryService.getAllCategories();
      res.status(StatusCodes.OK).json(categories);
    } catch (error: any) {
      handleError(res, error);
    }
  };
}
