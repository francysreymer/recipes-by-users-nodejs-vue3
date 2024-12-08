const TYPES = {
  ICategoryRepository: Symbol.for('ICategoryRepository'),
  IRecipeRepository: Symbol.for('IRecipeRepository'),
  IUserRepository: Symbol.for('IUserRepository'),
  IAuthService: Symbol.for('IAuthService'),
  ICategoryService: Symbol.for('ICategoryService'),
  IRecipeByUserService: Symbol.for('IRecipeByUserService'),
  IUserService: Symbol.for('IUserService'),
  MigrationService: Symbol.for('MigrationService'),
  DB: Symbol.for('db'),
  UserController: Symbol.for('UserController'),
  CategoryController: Symbol.for('CategoryController'),
  RecipeByUserController: Symbol.for('RecipeByUserController'),
  AuthController: Symbol.for('AuthController'),
};

export default TYPES;
