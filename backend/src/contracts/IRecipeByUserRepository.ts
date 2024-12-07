import { Recipe } from '@/entities/Recipe';
import RecipeFilter from '@/common/RecipeFilter';

export default interface IRecipeByUserRepository {
  findRecipesByUser(userId: number, filter?: RecipeFilter): Promise<Recipe[]>;
  findOneById(id: number): Promise<Recipe | null>;
  save(recipe: Recipe): Promise<Recipe>;
  delete(id: number): Promise<boolean>;
}
