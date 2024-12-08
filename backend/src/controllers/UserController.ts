import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { inject, injectable } from 'inversify';

import { formatErrors } from '@/common/formatErrors';
import { handleHttpError } from '@/common/handleHttpError';
import TYPES from '@/config/types';
import IUserService from '@/contracts/IUserService';
import { userSchema } from '@/validators/userValidator';

@injectable()
export class UserController {
  private userService: IUserService;

  constructor(@inject(TYPES.IUserService) userService: IUserService) {
    this.userService = userService;
  }

  register = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { error, value } = userSchema.validate(req.body);

      if (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(formatErrors(error));
      }

      const user = await this.userService.createUser(value);
      return res.status(StatusCodes.CREATED).json(user);
    } catch (error) {
      return handleHttpError(res, error);
    }
  };
}
