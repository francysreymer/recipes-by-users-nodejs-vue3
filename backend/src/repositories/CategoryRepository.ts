import { injectable, inject } from 'inversify';
import { Repository, DataSource } from 'typeorm';

import TYPES from '@/config/types';
import ICategoryRepository from '@/contracts/ICategoryRepository';
import { Category } from '@/entities/Category';

@injectable()
export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor(@inject(TYPES.DB) dataSource: DataSource) {
    this.repository = dataSource.getRepository(Category);
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }
}
