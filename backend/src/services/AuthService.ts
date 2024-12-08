import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { injectable, inject } from 'inversify';
import jwt from 'jsonwebtoken';

import TYPES from '@/config/types';
import IAuthService from '@/contracts/IAuthService';
import IUserRepository from '@/contracts/IUserRepository';

@injectable()
export class AuthService implements IAuthService {
  private userRepository: IUserRepository;
  private pepper: string;
  private readonly EXPIRES_IN_1_HOUR = '1h';

  constructor(@inject(TYPES.IUserRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.pepper = process.env.PEPPER || 'defaultPepper';
  }

  authenticate = async (login: string, password: string): Promise<string> => {
    // Find user by login
    const user = await this.userRepository.findOneByLogin(login);

    // Add pepper to the provided password
    const pepperedPassword = password + this.pepper;

    // Check password
    const isMatch = user
      ? await bcrypt.compare(pepperedPassword, user.password)
      : false;

    if (!user || !isMatch) {
      throw new createError.Unauthorized('Invalid login or password');
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, login: user.login, name: user.name },
      process.env.JWT_SECRET!,
      {
        expiresIn: this.EXPIRES_IN_1_HOUR,
      },
    );

    return token;
  };
}
