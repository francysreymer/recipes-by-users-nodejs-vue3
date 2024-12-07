import createError from 'http-errors';

import IRecipeByUserRepository from '@/contracts/IRecipeByUserRepository';
import IRecipeByUserService from '@/contracts/IRecipeByUserService';
import { Recipe } from '@/entities/Recipe';
import RecipeFilter from '@/common/RecipeFilter';

export class RecipeByUserService implements IRecipeByUserService {
  private recipeRepository: IRecipeByUserRepository;
  private readonly ERROR_MESSAGES = {
    RECIPE_NOT_FOUND: 'Recipe not found',
    UNAUTHORIZED_ACCESS: 'Unauthorized access to this recipe',
  };

  constructor(recipeRepository: IRecipeByUserRepository) {
    this.recipeRepository = recipeRepository;
  }

  findAll = async (
    userId: number,
    filter?: RecipeFilter,
  ): Promise<Recipe[]> => {
    return await this.recipeRepository.findUserRecipes(userId, filter);
  };

  findById = async (id: number, userId: number): Promise<Recipe | null> => {
    const recipe = await this.recipeRepository.findOneById(id);

    if (!recipe) {
      throw new createError.NotFound(this.ERROR_MESSAGES.RECIPE_NOT_FOUND);
    }

    if (recipe.id_usuarios.id !== userId) {
      throw new createError.Forbidden(this.ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }

    return recipe;
  };

  create = async (recipe: Recipe, userId: number): Promise<Recipe> => {
    recipe.id_usuarios = { id: userId } as Recipe['id_usuarios'];
    return await this.recipeRepository.save(recipe);
  };

  update = async (
    recipe: Recipe,
    id: number,
    userId: number,
  ): Promise<Recipe> => {
    const existingRecipe = await this.recipeRepository.findOneById(id);

    if (!existingRecipe) {
      throw new createError.NotFound(this.ERROR_MESSAGES.RECIPE_NOT_FOUND);
    }

    if (existingRecipe.id_usuarios.id !== userId) {
      throw new createError.Forbidden(this.ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }

    recipe.id = id;
    recipe.id_usuarios = { id: userId } as Recipe['id_usuarios'];
    return await this.recipeRepository.save(recipe);
  };

  delete = async (id: number, userId: number): Promise<void> => {
    const existingRecipe = await this.recipeRepository.findOneById(id);

    if (!existingRecipe) {
      throw new createError.NotFound(this.ERROR_MESSAGES.RECIPE_NOT_FOUND);
    }

    if (existingRecipe.id_usuarios.id !== userId) {
      throw new createError.Forbidden(this.ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }

    const deleted = await this.recipeRepository.delete(id);
    if (!deleted) {
      throw new createError.BadRequest(
        `Failed to delete recipe with id: ${id}`,
      );
    }
  };
}
