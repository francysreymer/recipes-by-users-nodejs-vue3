import { Recipe } from '@/entities/Recipe';
import RecipeFilter from '@/common/RecipeFilter';

export default interface IRecipeByUserService {
  findAll(userId: number, filter?: RecipeFilter): Promise<Recipe[]>;
  findById(id: number, userId: number): Promise<Recipe | null>;
  create(recipe: Recipe, userId: number): Promise<Recipe>;
  update(recipe: Recipe, id: number, userId: number): Promise<Recipe>;
  delete(id: number, userId: number): Promise<void>;
}
