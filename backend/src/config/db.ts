import dotenvSafe from 'dotenv-safe';
import { DataSource } from 'typeorm';

import { Category } from '@/entities/Category';
import { Recipe } from '@/entities/Recipe';
import { User } from '@/entities/User';
import { SeedCategories1733665696749 } from '@/migrations/1733665696749-SeedCategories';

dotenvSafe.config({
  allowEmptyValues: true,
});

export const db = new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_ROOT_HOST,
  port: parseInt(process.env.MYSQL_PORT || '3306', 10),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: false,
  logging: false,
  entities: [User, Category, Recipe],
  migrations: [SeedCategories1733665696749],
  subscribers: [],
});
