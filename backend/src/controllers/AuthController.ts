import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

import { formatErrors } from '@/common/formatErrors';
import { handleHttpError } from '@/common/handleHttpError';
import { AppDataSource } from '@/config/data-source';
import { User } from '@/entities/User';
import { UserRepository } from '@/repositories/UserRepository';
import { AuthService } from '@/services/AuthService';
import { authSchema } from '@/validators/authValidator';

export class AuthController {
  private authService: AuthService;

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
        return res.status(StatusCodes.BAD_REQUEST).json(formatErrors(error));
      }

      const { login, senha } = value;

      const token = await this.authService.authenticate(login, senha);
      return res.json({ token });
    } catch (error) {
      return handleHttpError(res, error);
    }
  }

  async logout(
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
  ): Promise<void> {
    res.json({ auth: false, token: null });
  }
}
