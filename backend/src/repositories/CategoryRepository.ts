import { Repository } from 'typeorm';

import ICategoryRepository from '@/contracts/ICategoryRepository';
import { Category } from '@/entities/Category';

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor(repository: Repository<Category>) {
    this.repository = repository;
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }
}
