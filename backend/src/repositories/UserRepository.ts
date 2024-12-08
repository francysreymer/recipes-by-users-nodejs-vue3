import { injectable, inject } from 'inversify';
import { Repository } from 'typeorm';

import TYPES from '@/config/types';
import IUserRepository from '@/contracts/IUserRepository';
import { User } from '@/entities/User';

@injectable()
export class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor(@inject(TYPES.DB) repository: Repository<User>) {
    this.repository = repository;
  }

  async findOneByLogin(login: string): Promise<User | null> {
    return await this.repository.findOne({ where: { login } });
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user);
  }
}
