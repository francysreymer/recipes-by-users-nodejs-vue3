import 'reflect-metadata';
import cors from 'cors';
import dotenvSafe from 'dotenv-safe';
import express from 'express';

import authRoutes from '@/routes/authRoutes';
import categoryRoutes from '@/routes/categoryRoutes';
import recipeRoutes from '@/routes/recipeRoutes';
import userRoutes from '@/routes/userRoutes';
import DatabaseService from '@/services/DatabaseService';

// Load environment variables from .env file and ensure required variables are set
dotenvSafe.config({
  allowEmptyValues: true,
});

const app = express();
app.use(express.json());
// Use the CORS middleware
app.use(
  cors({
    origin: 'http://localhost:8082', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow these headers
  }),
);
app.use('/api', authRoutes);
app.use('/api', recipeRoutes);
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

const PORT = process.env.APP_PORT || 3002;

(async () => {
  try {
    await DatabaseService.initializeDatabase();
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
})();

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
});
