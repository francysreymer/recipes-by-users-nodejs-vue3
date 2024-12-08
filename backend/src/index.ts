import 'reflect-metadata';
import cors from 'cors';
import dotenvSafe from 'dotenv-safe';
import express from 'express';
import { DataSource } from 'typeorm';

import container from '@/config/container';
import TYPES from '@/config/types';
import authRoutes from '@/routes/authRoutes';
import categoryRoutes from '@/routes/categoryRoutes';
import recipeByUserRoutes from '@/routes/recipeByUserRoutes';
import userRoutes from '@/routes/userRoutes';

dotenvSafe.config({
  allowEmptyValues: true,
});

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:8082', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  }),
);
app.use('/api', authRoutes);
app.use('/api', recipeByUserRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

const PORT = process.env.APP_PORT || 3000;

(async () => {
  try {
    const db = container.get<DataSource>(TYPES.DB);
    await db.initialize();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error during application startup:', error);
  }
})();
