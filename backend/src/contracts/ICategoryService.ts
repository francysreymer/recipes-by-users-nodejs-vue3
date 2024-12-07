import { Category } from '@/entities/Category';

export default interface ICategoryService {
  findAll(): Promise<Category[]>;
}
