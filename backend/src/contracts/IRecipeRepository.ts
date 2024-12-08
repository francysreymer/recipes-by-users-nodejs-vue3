import RecipeFilter from '@/common/RecipeFilter';
import { Recipe } from '@/entities/Recipe';

export default interface IRecipeRepository {
  findRecipesByUser(userId: number, filter?: RecipeFilter): Promise<Recipe[]>;
  findOneById(id: number): Promise<Recipe | null>;
  save(recipe: Recipe): Promise<Recipe>;
  delete(id: number): Promise<boolean>;
}
