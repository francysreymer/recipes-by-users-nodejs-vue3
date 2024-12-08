import createError from 'http-errors';
import { injectable, inject } from 'inversify';

import RecipeFilter from '@/common/RecipeFilter';
import TYPES from '@/config/types';
import IRecipeByUserService from '@/contracts/IRecipeByUserService';
import IRecipeRepository from '@/contracts/IRecipeRepository';
import { Recipe } from '@/entities/Recipe';
import { User } from '@/entities/User';

@injectable()
export class RecipeByUserService implements IRecipeByUserService {
  private recipeRepository: IRecipeRepository;
  private readonly RECIPE_NOT_FOUND = 'Recipe not found';
  private readonly UNAUTHORIZED_ACCESS = 'Unauthorized access to this recipe';

  constructor(
    @inject(TYPES.IRecipeRepository) recipeRepository: IRecipeRepository,
  ) {
    this.recipeRepository = recipeRepository;
  }

  findAll = async (
    userId: number,
    filter?: RecipeFilter,
  ): Promise<Recipe[]> => {
    return await this.recipeRepository.findRecipesByUser(userId, filter);
  };

  findById = async (id: number, userId: number): Promise<Recipe | null> => {
    const recipe = await this.recipeRepository.findOneById(id);

    if (!recipe) {
      throw new createError.NotFound(this.RECIPE_NOT_FOUND);
    }

    if (recipe.user.id !== userId) {
      throw new createError.Forbidden(this.UNAUTHORIZED_ACCESS);
    }

    return recipe;
  };

  create = async (recipe: Recipe, userId: number): Promise<Recipe> => {
    recipe.user = { id: userId } as User;
    return await this.recipeRepository.save(recipe);
  };

  update = async (
    recipe: Recipe,
    id: number,
    userId: number,
  ): Promise<Recipe> => {
    const existingRecipe = await this.recipeRepository.findOneById(id);

    if (!existingRecipe) {
      throw new createError.NotFound(this.RECIPE_NOT_FOUND);
    }

    if (existingRecipe.user.id !== userId) {
      throw new createError.Forbidden(this.UNAUTHORIZED_ACCESS);
    }

    recipe.id = id;
    recipe.user = { id: userId } as User;
    return await this.recipeRepository.save(recipe);
  };

  delete = async (id: number, userId: number): Promise<void> => {
    const existingRecipe = await this.recipeRepository.findOneById(id);

    if (!existingRecipe) {
      throw new createError.NotFound(this.RECIPE_NOT_FOUND);
    }

    if (existingRecipe.user.id !== userId) {
      throw new createError.Forbidden(this.UNAUTHORIZED_ACCESS);
    }

    const deleted = await this.recipeRepository.delete(id);
    if (!deleted) {
      throw new createError.BadRequest(
        `Failed to delete recipe with id: ${id}`,
      );
    }
  };
}
