import { Router } from "express";
import { AuthController } from "@/controllers/AuthController";
import { authJWTMiddleware } from "@/middlewares/authJWTMiddleware";

const authRoutes = Router();
const authController = new AuthController();

authRoutes.post("/login", async (req, res) => {
  await authController.login(req, res);
});
authRoutes.post("/logout", authJWTMiddleware, authController.logout);

export default authRoutes;
