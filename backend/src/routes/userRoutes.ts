import { Router } from 'express';

import container from '@/config/container';
import TYPES from '@/config/types';
import { UserController } from '@/controllers/UserController';

const userRoutes = Router();
const userController = container.get<UserController>(TYPES.UserController);

userRoutes.post('/users', async (req, res) => {
  await userController.register(req, res);
});

export default userRoutes;
