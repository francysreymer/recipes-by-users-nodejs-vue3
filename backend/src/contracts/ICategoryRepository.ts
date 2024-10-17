import { Category } from "@/entities/Category";

export default interface ICategoryRepository {
  findAll(): Promise<Category[]>;
}
