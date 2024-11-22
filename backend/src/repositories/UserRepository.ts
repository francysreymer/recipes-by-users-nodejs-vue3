import { Repository } from 'typeorm';

import IUserRepository from '@/contracts/IUserRepository';
import { User } from '@/entities/User';

export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor(repository: Repository<User>) {
    this.repository = repository;
  }

  async findOneByLogin(login: string): Promise<User | null> {
    return await this.repository.findOne({ where: { login } });
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }
}
