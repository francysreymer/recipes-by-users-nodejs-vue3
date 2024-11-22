import bcrypt from 'bcrypt';
import createError from 'http-errors';
import jwt from 'jsonwebtoken';

import IUserRepository from '@/contracts/IUserRepository';

export class AuthService {
  private userRepository: IUserRepository;
  private pepper: string;
  private readonly EXPIRES_IN_1_HOUR = '1h';
  private readonly ERROR_MESSAGES = {
    INVALID_LOGIN: 'Invalid login or password',
  };

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.pepper = process.env.PEPPER || 'defaultPepper';
  }

  authenticate = async (
    login: string,
    senha: string,
  ): Promise<string | null> => {
    // Find user by login
    const user = await this.userRepository.findOneByLogin(login);

    // Add pepper to the provided password
    const pepperedPassword = senha + this.pepper;

    // Check password
    const isMatch = user
      ? await bcrypt.compare(pepperedPassword, user.senha)
      : false;

    if (!user || !isMatch) {
      throw new createError.Unauthorized(this.ERROR_MESSAGES.INVALID_LOGIN);
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, login: user.login, name: user.nome },
      process.env.JWT_SECRET!,
      {
        expiresIn: this.EXPIRES_IN_1_HOUR,
      },
    );

    return token;
  };
}
