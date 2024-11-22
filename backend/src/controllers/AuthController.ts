import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { AppDataSource } from '@/config/data-source';
import { User } from '@/entities/User';
import { UserRepository } from '@/repositories/UserRepository';
import { AuthService } from '@/services/AuthService';
import { authSchema } from '@/validators/authValidator';

export class AuthController {
  private authService: AuthService;
  private readonly ERROR_MESSAGES = {
    VALIDATION_ERROR: 'Validation error',
  };

  constructor() {
    const userRepository = new UserRepository(
      AppDataSource.getRepository(User),
    );
    this.authService = new AuthService(userRepository);
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = authSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          message: this.ERROR_MESSAGES.VALIDATION_ERROR,
          details: error.details,
        });
      }

      const { login, senha } = value;

      const token = await this.authService.authenticate(login, senha);
      return res.json({ token });
    } catch (error) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: error.message });
    }
  }

  async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
    res.json({ auth: false, token: null });
  }
}
