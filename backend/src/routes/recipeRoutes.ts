import { Router } from "express";
import { RecipeController } from "@/controllers/RecipeController";
import { authJWTMiddleware } from "@/middlewares/authJWTMiddleware"; // Import the auth middleware

const recipeRoutes = Router();
const recipeController = new RecipeController();

recipeRoutes.get(
  "/recipes",
  authJWTMiddleware,
  recipeController.getAllUserRecipes
);
recipeRoutes.get(
  "/recipes/:id",
  authJWTMiddleware,
  recipeController.getUserRecipeById
);
recipeRoutes.post(
  "/recipes",
  authJWTMiddleware,
  recipeController.createUserRecipe
);
recipeRoutes.put(
  "/recipes/:id",
  authJWTMiddleware,
  recipeController.updateUserRecipe
);
recipeRoutes.delete(
  "/recipes/:id",
  authJWTMiddleware,
  recipeController.deleteUserRecipe
);

export default recipeRoutes;
