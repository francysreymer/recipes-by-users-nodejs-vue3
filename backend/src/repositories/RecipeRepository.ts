import { injectable, inject } from 'inversify';
import { Repository, DataSource } from 'typeorm';

import RecipeFilter from '@/common/RecipeFilter';
import TYPES from '@/config/types';
import IRecipeRepository from '@/contracts/IRecipeRepository';
import { Recipe } from '@/entities/Recipe';

@injectable()
export class RecipeRepository implements IRecipeRepository {
  private repository: Repository<Recipe>;

  constructor(@inject(TYPES.DB) dataSource: DataSource) {
    this.repository = dataSource.getRepository(Recipe);
  }

  async findRecipesByUser(
    userId: number,
    filter?: RecipeFilter,
  ): Promise<Recipe[]> {
    const query = this.repository
      .createQueryBuilder('recipe')
      .where('recipe.user_id = :userId', { userId });

    if (filter) {
      if (filter.name) {
        query.andWhere('recipe.name LIKE :name', { name: `%${filter.name}%` });
      }
      if (filter.preparation_time_minutes) {
        query.andWhere(
          'recipe.preparation_time_minutes = :preparation_time_minutes',
          { preparation_time_minutes: filter.preparation_time_minutes },
        );
      }
    }

    return await query
      .leftJoinAndSelect('recipe.category', 'category')
      .getMany();
  }

  async findOneById(id: number): Promise<Recipe | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['user', 'category'],
      select: {
        id: true,
        name: true,
        preparation_time_minutes: true,
        servings: true,
        preparation_method: true,
        ingredients: true,
        createdAt: true,
        updatedAt: true,
        user: {
          id: true,
          name: true,
          login: true,
        },
        category: {
          id: true,
          name: true,
        },
      },
    });
  }

  async save(recipe: Recipe): Promise<Recipe> {
    return await this.repository.save(recipe);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected === 1;
  }
}
