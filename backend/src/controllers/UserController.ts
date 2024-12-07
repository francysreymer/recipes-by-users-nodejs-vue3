import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { formatErrors } from '@/common/formatErrors';
import { handleHttpError } from '@/common/handleHttpError';
import { AppDataSource } from '@/config/data-source';
import { User } from '@/entities/User';
import { UserRepository } from '@/repositories/UserRepository';
import { UserService } from '@/services/UserService';
import { userSchema } from '@/validators/userValidator';

export class UserController {
  private userService: UserService;

  constructor() {
    const userRepository = new UserRepository(
      AppDataSource.getRepository(User),
    );
    this.userService = new UserService(userRepository);
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
