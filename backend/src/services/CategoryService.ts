import ICategoryRepository from '@/contracts/ICategoryRepository';
import ICategoryService from '@/contracts/ICategoryService';
import { Category } from '@/entities/Category';

export class CategoryService implements ICategoryService {
  private categoryRepository: ICategoryRepository;

  constructor(categoryRepository: ICategoryRepository) {
    this.categoryRepository = categoryRepository;
  }

  getAllCategories = async (): Promise<Category[]> => {
    return await this.categoryRepository.findAll();
  };
}
