import { Repository } from "typeorm";
import { Category } from "@/entities/Category";
import ICategoryRepository from "@/contracts/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor(repository: Repository<Category>) {
    this.repository = repository;
  }

  async findAll(): Promise<Category[]> {
    return await this.repository.find();
  }
}
