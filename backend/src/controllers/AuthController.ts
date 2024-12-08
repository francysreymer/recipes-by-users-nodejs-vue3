import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { formatErrors } from '@/common/formatErrors';
import { handleHttpError } from '@/common/handleHttpError';
import TYPES from '@/config/types';
import IAuthService from '@/contracts/IAuthService';
import { authSchema } from '@/validators/authValidator';

@injectable()
export class AuthController {
  private authService: IAuthService;

  constructor(@inject(TYPES.IAuthService) authService: IAuthService) {
    this.authService = authService;
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { error, value } = authSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(formatErrors(error));
      }

      const { login, password } = value;

      const token = await this.authService.authenticate(login, password);
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
