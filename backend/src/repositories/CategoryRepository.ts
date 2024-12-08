import { injectable, inject } from 'inversify';
import { Repository } from 'typeorm';

import TYPES from '@/config/types';
import ICategoryRepository from '@/contracts/ICategoryRepository';
import { Category } from '@/entities/Category';

@injectable()
export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor(@inject(TYPES.DB) repository: Repository<Category>) {
    this.repository = repository;
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }
}
