import { Router } from 'express';

import { CategoryController } from '@/controllers/CategoryController';
import { authJWTMiddleware } from '@/middlewares/authJWTMiddleware';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.get(
  '/categories',
  authJWTMiddleware,
  categoryController.findAll,
);

export default categoryRoutes;
