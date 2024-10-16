import { Recipe } from "@/entities/Recipe";
import IRecipeRepository from "@/contracts/IRecipeRepository";
import IRecipeService from "@/contracts/IRecipeService";
import RecipeFilter from "@/types/RecipeFilter";
import createError from "http-errors";

export class RecipeService implements IRecipeService {
  private recipeRepository: IRecipeRepository;
  private readonly ERROR_MESSAGES = {
    RECIPE_NOT_FOUND: "Recipe not found",
    UNAUTHORIZED_ACCESS: "Unauthorized access to this recipe",
    FAILED_TO_DELETE: "Failed to delete recipe",
  };

  constructor(recipeRepository: IRecipeRepository) {
    this.recipeRepository = recipeRepository;
  }

  getAllUserRecipes = async (
    userId: number,
    filter?: RecipeFilter
  ): Promise<Recipe[]> => {
    return await this.recipeRepository.findUserRecipes(userId, filter);
  };

  getUserRecipeById = async (
    id: number,
    userId: number
  ): Promise<Recipe | null> => {
    const recipe = await this.recipeRepository.findOneById(id);

    if (!recipe) {
      throw new createError.NotFound(this.ERROR_MESSAGES.RECIPE_NOT_FOUND);
    }

    if (recipe.id_usuarios.id !== userId) {
      throw new createError.Forbidden(this.ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }

    return recipe;
  };

  createRecipe = async (recipe: Recipe, userId: number): Promise<Recipe> => {
    recipe.id_usuarios = { id: userId } as Recipe["id_usuarios"];
    return await this.recipeRepository.save(recipe);
  };

  updateRecipe = async (
    recipe: Recipe,
    id: number,
    userId: number
  ): Promise<Recipe> => {
    const existingRecipe = await this.recipeRepository.findOneById(id);

    if (!existingRecipe) {
      throw new createError.NotFound(this.ERROR_MESSAGES.RECIPE_NOT_FOUND);
    }

    if (existingRecipe.id_usuarios.id !== userId) {
      throw new createError.Forbidden(this.ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }

    recipe.id_usuarios = { id: userId } as Recipe["id_usuarios"];
    return await this.recipeRepository.save(recipe);
  };

  deleteRecipe = async (id: number, userId: number): Promise<void> => {
    const existingRecipe = await this.recipeRepository.findOneById(id);

    if (!existingRecipe) {
      throw new createError.NotFound(this.ERROR_MESSAGES.RECIPE_NOT_FOUND);
    }

    if (existingRecipe.id_usuarios.id !== userId) {
      throw new createError.Forbidden(this.ERROR_MESSAGES.UNAUTHORIZED_ACCESS);
    }

    const deleted = await this.recipeRepository.delete(id);
    if (!deleted) {
      throw new createError.BadRequest(this.ERROR_MESSAGES.FAILED_TO_DELETE);
    }
  };
}
