import { Router } from 'express';

import { RecipeByUserController } from '@/controllers/RecipeByUserController';
import { authJWTMiddleware } from '@/middlewares/authJWTMiddleware';

const recipeByUserRoutes = Router();
const recipeByUserController = new RecipeByUserController();

recipeByUserRoutes.get(
  '/recipes',
  authJWTMiddleware,
  recipeByUserController.findAll,
);
recipeByUserRoutes.get(
  '/recipes/:id',
  authJWTMiddleware,
  recipeByUserController.findById,
);
recipeByUserRoutes.post(
  '/recipes',
  authJWTMiddleware,
  recipeByUserController.create,
);
recipeByUserRoutes.put(
  '/recipes/:id',
  authJWTMiddleware,
  recipeByUserController.update,
);
recipeByUserRoutes.delete(
  '/recipes/:id',
  authJWTMiddleware,
  recipeByUserController.delete,
);

export default recipeByUserRoutes;
