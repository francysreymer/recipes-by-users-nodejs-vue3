import { Router } from 'express';

import container from '@/config/container';
import TYPES from '@/config/types';
import { AuthController } from '@/controllers/AuthController';
import { authJWTMiddleware } from '@/middlewares/authJWTMiddleware';

const authRoutes = Router();
const authController = container.get<AuthController>(TYPES.AuthController);

authRoutes.post('/login', async (req, res) => {
  await authController.login(req, res);
});
authRoutes.post('/logout', authJWTMiddleware, authController.logout);

export default authRoutes;
