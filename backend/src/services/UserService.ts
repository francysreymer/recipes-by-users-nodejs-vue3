import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { injectable, inject } from 'inversify';

import TYPES from '@/config/types';
import IUserRepository from '@/contracts/IUserRepository';
import IUserService from '@/contracts/IUserService';
import { User } from '@/entities/User';

@injectable()
export class UserService implements IUserService {
  private userRepository: IUserRepository;
  private pepper: string;

  constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.pepper = process.env.PEPPER || 'defaultPepper';
  }

  getUserByLogin = async (login: string): Promise<User | null> => {
    const user = await this.userRepository.findOneByLogin(login);
    if (!user) {
      throw createError.NotFound('User not found');
    }

    return user;
  };

  createUser = async (user: User): Promise<User> => {
    // Hash the password with salt and pepper before saving the user
    const saltRounds = 10;
    const saltedPassword = user.password + this.pepper;
    user.password = await bcrypt.hash(saltedPassword, saltRounds);

    return await this.userRepository.save(user);
  };
}
