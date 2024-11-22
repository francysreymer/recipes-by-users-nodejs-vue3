import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppDataSource } from '@/config/data-source';
import { Recipe } from '@/entities/Recipe';
import { AuthRequest } from '@/middlewares/authJWTMiddleware';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import { RecipeService } from '@/services/RecipeService';
import { handleError, CustomError } from '@/utils/errorHandler';
import { recipeSchema } from '@/validators/recipeValidator';

export class RecipeController {
  private recipeService: RecipeService;
  private readonly ERROR_MESSAGES = {
    VALIDATION_ERROR: 'Validation error',
    UNAUTHORIZED: 'Unauthorized',
  };

  constructor() {
    const recipeRepository = new RecipeRepository(
      AppDataSource.getRepository(Recipe),
    );
    this.recipeService = new RecipeService(recipeRepository);
  }

  getAllUserRecipes = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;

      // Extract filter parameters
      const { nome, tempo_preparo_minutos } = req.query;
      const filter = {
        nome: nome ? String(nome) : undefined,
        tempo_preparo_minutos: tempo_preparo_minutos
          ? parseInt(String(tempo_preparo_minutos), 10)
          : undefined,
      };

      const recipes = await this.recipeService.getAllUserRecipes(
        userId,
        filter,
      );
      res.status(StatusCodes.OK).json(recipes);
    } catch (error: unknown) {
      handleError(res, error as CustomError);
    }
  };

  getUserRecipeById = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const recipeId = parseInt(req.params.id, 10);

      const recipe = await this.recipeService.getUserRecipeById(
        recipeId,
        userId,
      );
      res.status(StatusCodes.OK).json(recipe);
    } catch (error: CustomError) {
      handleError(res, error);
    }
  };

  createUserRecipe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
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
    } catch (error: unknown) {
      handleError(res, error as CustomError);
    }
  };

  updateUserRecipe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
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
        userId,
      );
      res.status(StatusCodes.OK).json(recipe);
    } catch (error: unknown) {
      handleError(res, error as CustomError);
    }
  };

  deleteUserRecipe = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const recipeId = parseInt(req.params.id, 10);

      await this.recipeService.deleteRecipe(recipeId, userId);
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error: unknown) {
      handleError(res, error as CustomError);
    }
  };
}
