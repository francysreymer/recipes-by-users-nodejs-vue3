import { Router } from 'express';

import container from '@/config/container';
import TYPES from '@/config/types';
import { CategoryController } from '@/controllers/CategoryController';
import { authJWTMiddleware } from '@/middlewares/authJWTMiddleware';

const categoryRoutes = Router();
const categoryController = container.get<CategoryController>(
  TYPES.CategoryController,
);

categoryRoutes.get(
  '/categories',
  authJWTMiddleware,
  categoryController.findAll,
);

export default categoryRoutes;
