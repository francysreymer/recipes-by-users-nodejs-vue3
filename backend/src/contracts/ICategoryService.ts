import { Category } from '@/entities/Category';

export default interface ICategoryService {
  getAllCategories(): Promise<Category[]>;
}
