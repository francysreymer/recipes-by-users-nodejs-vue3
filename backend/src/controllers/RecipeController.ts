import { Response, NextFunction } from "express";
import { AppDataSource } from "@/config/data-source";
import { RecipeService } from "@/services/RecipeService";
import { RecipeRepository } from "@/repositories/RecipeRepository";
import { Recipe } from "@/entities/Recipe";
import { StatusCodes } from "http-status-codes";
import { AuthRequest } from "@/middlewares/authJWTMiddleware";
import { recipeSchema } from "@/validators/recipeValidator";
import { handleError } from "@/utils/errorHandler";

export class RecipeController {
  private recipeService: RecipeService;
  private readonly ERROR_MESSAGES = {
    VALIDATION_ERROR: "Validation error",
    UNAUTHORIZED: "Unauthorized",
  };

  constructor() {
    const recipeRepository = new RecipeRepository(
      AppDataSource.getRepository(Recipe)
    );
    this.recipeService = new RecipeService(recipeRepository);
  }

  getAllUserRecipes = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const recipes = await this.recipeService.getAllUserRecipes(userId);
      res.status(StatusCodes.OK).json(recipes);
    } catch (error: any) {
      handleError(res, error);
    }
  };

  getUserRecipeById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const recipeId = parseInt(req.params.id, 10);

      const recipe = await this.recipeService.getUserRecipeById(
        recipeId,
        userId
      );
      res.status(StatusCodes.OK).json(recipe);
    } catch (error: any) {
      handleError(res, error);
    }
  };

  createUserRecipe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { error, value } = recipeSchema.validate(req.body);
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: this.ERROR_MESSAGES.VALIDATION_ERROR,
          details: error.details,
        });
        return;
      }

      const userId = req.user?.id;
      const recipe = await this.recipeService.createRecipe(value, userId);
      res.status(StatusCodes.CREATED).json(recipe);
    } catch (error: any) {
      handleError(res, error);
    }
  };

  updateUserRecipe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { error, value } = recipeSchema.validate(req.body);
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json({
          message: this.ERROR_MESSAGES.VALIDATION_ERROR,
          details: error.details,
        });
        return;
      }

      const userId = req.user?.id;
      const recipeId = parseInt(req.params.id, 10);
      const recipe = await this.recipeService.updateRecipe(
        value,
        recipeId,
        userId
      );
      res.status(StatusCodes.OK).json(recipe);
    } catch (error: any) {
      handleError(res, error);
    }
  };

  deleteUserRecipe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const recipeId = parseInt(req.params.id, 10);

      await this.recipeService.deleteRecipe(recipeId, userId);
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error: any) {
      handleError(res, error);
    }
  };
}
