import { Repository } from 'typeorm';

import IRecipeByUserRepository from '@/contracts/IRecipeByUserRepository';
import { Recipe } from '@/entities/Recipe';
import RecipeFilter from '@/types/RecipeFilter';

export class RecipeRepository implements IRecipeByUserRepository {
  private repository: Repository<Recipe>;

  constructor(repository: Repository<Recipe>) {
    this.repository = repository;
  }

  async findUserRecipes(
    userId: number,
    filter?: RecipeFilter,
  ): Promise<Recipe[]> {
    const where: RecipeFilter = { id_usuarios: { id: userId } };

    if (filter) {
      if (filter.nome) {
        where.nome = filter.nome;
      }
      if (filter.tempo_preparo_minutos) {
        where.tempo_preparo_minutos = filter.tempo_preparo_minutos;
      }
    }

    return await this.repository.find({
      where,
      relations: ['id_categorias'],
    });
  }

  async findOneById(id: number): Promise<Recipe | null> {
    return await this.repository.findOne({
      where: { id },
      relations: ['id_usuarios', 'id_categorias'],
      select: {
        id: true,
        nome: true,
        tempo_preparo_minutos: true,
        porcoes: true,
        modo_preparo: true,
        ingredientes: true,
        criado_em: true,
        alterado_em: true,
        id_usuarios: {
          id: true,
          nome: true,
          login: true,
        },
        id_categorias: {
          id: true,
          nome: true,
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
