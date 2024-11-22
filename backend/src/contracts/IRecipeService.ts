import { Recipe } from '@/entities/Recipe';
import RecipeFilter from '@/types/RecipeFilter';

export default interface IRecipeService {
  getAllUserRecipes(userId: number, filter?: RecipeFilter): Promise<Recipe[]>;
  getUserRecipeById(id: number, userId: number): Promise<Recipe | null>;
  createRecipe(recipe: Recipe, userId: number): Promise<Recipe>;
  updateRecipe(recipe: Recipe, id: number, userId: number): Promise<Recipe>;
  deleteRecipe(id: number, userId: number): Promise<void>;
}
