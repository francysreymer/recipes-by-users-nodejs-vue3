import 'reflect-metadata';
import { Container } from 'inversify';

import { db } from '@/config/db';
import TYPES from '@/config/types';
import IAuthService from '@/contracts/IAuthService';
import ICategoryRepository from '@/contracts/ICategoryRepository';
import ICategoryService from '@/contracts/ICategoryService';
import IRecipeByUserService from '@/contracts/IRecipeByUserService';
import IRecipeRepository from '@/contracts/IRecipeRepository';
import IUserRepository from '@/contracts/IUserRepository';
import IUserService from '@/contracts/IUserService';
import { AuthController } from '@/controllers/AuthController';
import { CategoryController } from '@/controllers/CategoryController';
import { RecipeByUserController } from '@/controllers/RecipeByUserController';
import { UserController } from '@/controllers/UserController';
import { CategoryRepository } from '@/repositories/CategoryRepository';
import { RecipeRepository } from '@/repositories/RecipeRepository';
import { UserRepository } from '@/repositories/UserRepository';
import { AuthService } from '@/services/AuthService';
import { CategoryService } from '@/services/CategoryService';
import { RecipeByUserService } from '@/services/RecipeByUserService';
import { UserService } from '@/services/UserService';

const container = new Container();

// Register controllers
container.bind<AuthController>(TYPES.AuthController).to(AuthController);
container
  .bind<CategoryController>(TYPES.CategoryController)
  .to(CategoryController);
container
  .bind<RecipeByUserController>(TYPES.RecipeByUserController)
  .to(RecipeByUserController);
container.bind<UserController>(TYPES.UserController).to(UserController);

// Register repositories
container
  .bind<ICategoryRepository>(TYPES.ICategoryRepository)
  .to(CategoryRepository);
container.bind<IRecipeRepository>(TYPES.IRecipeRepository).to(RecipeRepository);
container.bind<IUserRepository>(TYPES.IUserRepository).to(UserRepository);

// Register services
container.bind<IAuthService>(TYPES.IAuthService).to(AuthService);
container.bind<ICategoryService>(TYPES.ICategoryService).to(CategoryService);
container
  .bind<IRecipeByUserService>(TYPES.IRecipeByUserService)
  .to(RecipeByUserService);
container.bind<IUserService>(TYPES.IUserService).to(UserService);

// Register database
container.bind(TYPES.DB).toConstantValue(db);

export default container;
