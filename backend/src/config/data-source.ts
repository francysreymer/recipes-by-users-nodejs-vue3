import { DataSource } from 'typeorm';

import { Category } from '@/entities/Category';
import { Recipe } from '@/entities/Recipe';
import { User } from '@/entities/User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User, Category, Recipe],
  migrations: [],
  subscribers: [],
});
