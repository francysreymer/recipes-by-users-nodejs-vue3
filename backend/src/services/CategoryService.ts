import { injectable, inject } from 'inversify';

import TYPES from '@/config/types';
import ICategoryRepository from '@/contracts/ICategoryRepository';
import ICategoryService from '@/contracts/ICategoryService';
import { Category } from '@/entities/Category';

@injectable()
export class CategoryService implements ICategoryService {
  private categoryRepository: ICategoryRepository;

  constructor(
    @inject(TYPES.ICategoryRepository) categoryRepository: ICategoryRepository,
  ) {
    this.categoryRepository = categoryRepository;
  }

  findAll = async (): Promise<Category[]> => {
    return await this.categoryRepository.findAll();
  };
}
