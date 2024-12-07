import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { formatErrors } from '@/common/formatErrors';
import { handleHttpError } from '@/common/handleHttpError';
import { AppDataSource } from '@/config/data-source';
import { Recipe } from '@/entities/Recipe';
import { AuthRequest } from '@/middlewares/authJWTMiddleware';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import { RecipeByUserService } from '@/services/RecipeByUserService';
import { idSchema } from '@/validators/idSchema';
import { recipeByUserFilterSchema } from '@/validators/recipeByUserFilterSchema';
import { recipeSchema } from '@/validators/recipeValidator';

export class RecipeByUserController {
  private recipeByUserService: RecipeByUserService;

  constructor() {
    const recipeRepository = new RecipeRepository(
      AppDataSource.getRepository(Recipe),
    );
    this.recipeByUserService = new RecipeByUserService(recipeRepository);
  }

  findAll = async (
    req: AuthRequest,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;

      const { error, value: filters } = recipeByUserFilterSchema.validate(
        req.query,
        {
          stripUnknown: true,
          abortEarly: false,
        },
      );

      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json(formatErrors(error));
      }

      const recipes = await this.recipeByUserService.findAll(userId, filters);
      res.status(StatusCodes.OK).json(recipes);
    } catch (error: unknown) {
      handleHttpError(res, error);
    }
  };

  findById = async (
    req: AuthRequest,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;

      const { error: idRecipeError, value: recipeId } = idSchema.validate(
        req.params.id,
      );

      if (idRecipeError) {
        res.status(StatusCodes.BAD_REQUEST).json(formatErrors(idRecipeError));
      }

      const recipe = await this.recipeByUserService.findById(recipeId, userId);
      res.status(StatusCodes.OK).json(recipe);
    } catch (error: unknown) {
      handleHttpError(res, error);
    }
  };

  create = async (
    req: AuthRequest,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;

      const { error, value } = recipeSchema.validate(req.body);
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json(formatErrors(error));
        return;
      }

      const recipe = await this.recipeByUserService.create(value, userId);
      res.status(StatusCodes.CREATED).json(recipe);
    } catch (error: unknown) {
      handleHttpError(res, error);
    }
  };

  update = async (
    req: AuthRequest,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;

      const { error: idRecipeError, value: recipeId } = idSchema.validate(
        req.params.id,
      );

      if (idRecipeError) {
        res.status(StatusCodes.BAD_REQUEST).json(formatErrors(idRecipeError));
      }

      const { error, value } = recipeSchema.validate(req.body);
      if (error) {
        res.status(StatusCodes.BAD_REQUEST).json(formatErrors(error));
        return;
      }

      const recipe = await this.recipeByUserService.update(
        value,
        recipeId,
        userId,
      );
      res.status(StatusCodes.OK).json(recipe);
    } catch (error: unknown) {
      handleHttpError(res, error);
    }
  };

  delete = async (
    req: AuthRequest,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): Promise<void> => {
    try {
      const userId = req.user?.id;
      const { error: idRecipeError, value: recipeId } = idSchema.validate(
        req.params.id,
      );

      if (idRecipeError) {
        res.status(StatusCodes.BAD_REQUEST).json(formatErrors(idRecipeError));
      }

      await this.recipeByUserService.delete(recipeId, userId);
      res.status(StatusCodes.NO_CONTENT).end();
    } catch (error: unknown) {
      handleHttpError(res, error);
    }
  };
}
